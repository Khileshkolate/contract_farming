import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Connect to Farmer_Login database
mongoose.connect("mongodb+srv://khilesh:12345@cluster0.kbiwox8.mongodb.net/Buyer_Login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to Farmer_Login DB"))
.catch(err => console.error("MongoDB connection error:", err));

// Enhanced Contract Schema
const contractSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  area: { type: String, required: true },
  farmer: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  image: String
});

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Profile Schema
const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  email: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Negotiation Schema
const negotiationSchema = new mongoose.Schema({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User", userSchema);
const Contract = mongoose.model("Contract", contractSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Negotiation = mongoose.model('Negotiation', negotiationSchema);

// Authentication Middleware
const authenticateBuyer = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Authorization required" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user || req.user.role !== 'buyer') {
      return res.status(401).json({ message: "Invalid buyer account" });
    }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Contracts Endpoint
app.get("/api/contracts", authenticateBuyer, async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('farmer', 'fName lName email')
      .sort({ createdAt: -1 });

    const enhancedContracts = contracts.map(contract => ({
      id: contract._id,
      title: contract.title,
      description: contract.description,
      price: contract.price,
      duration: contract.duration,
      area: contract.area,
      farmer: {
        name: `${contract.farmer.fName} ${contract.farmer.lName}`,
        email: contract.farmer.email
      },
      image: contract.image,
      createdAt: contract.createdAt
    }));

    res.json(enhancedContracts);
  } catch (error) {
    console.error("Contracts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Authentication Routes
app.post("/api/buyer/signup", async (req, res) => {
  try {
    const { fName, lName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fName, lName, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Registration failed" });
  }
});

app.post("/api/buyer/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Profile Endpoints
app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/profile', authenticate, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: { ...req.body, updatedAt: new Date() } },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Negotiation Endpoints
router.post('/negotiations', async (req, res) => {
  try {
    const { contractId, buyerId, farmer, proposedPrice } = req.body;

    if (!contractId || !proposedPrice || !farmer) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newNegotiation = await Negotiation.create({
      contractId,
      buyerId,
      farmer,      // make sure this value is coming from frontend request
      proposedPrice
    });

    res.status(201).json(newNegotiation);

  } catch (error) {
    console.error("Negotiation creation error:", error);
    res.status(500).json({ error: "Server error creating negotiation" });
  }
});


app.get('/api/negotiations', authenticate, async (req, res) => {
  try {
    const negotiations = await Negotiation.find({ farmer: req.user._id })
      .populate('contract buyer', 'title name email');
    res.json(negotiations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(5000, () => console.log("Buyer API running on port 5000"));