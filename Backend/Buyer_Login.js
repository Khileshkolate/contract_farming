import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";





const app = express();
app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://khilesh:12345@cluster0.kbiwox8.mongodb.net/Buyer_Login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected to 'Buyer_Login' database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Schemas and Models
const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});


// Update contract schema
const contractSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
  duration: Number,
  area: String,
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User", userSchema, "users");
const Contract = mongoose.model("Contract", contractSchema, "contracts"); 

// Authentication Middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Authorization required" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: "User not found" });
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};

// Helper Functions
const createUser = async (req, res) => {
  const { fName, lName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fName, lName, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};







app.get("/api/contracts", authenticate, async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('farmer', 'fName lName email')
      .sort({ createdAt: -1 });
    res.json(contracts);
  } catch (error) {
    console.error("Contracts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


const showContracts = async(req,res)=>{
  try{
    let data = Contract.find({});
    console.log(data);

  }catch(err){
    res.status(500).json({message: "failed to fetch data"});
  }
}

// Fix the showContracts endpoint
app.get("/api/contracts", authenticate, async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('farmer', 'fName lName email')
      .sort({ createdAt: -1 });

    const enhancedContracts = contracts.map(contract => ({
      _id: contract._id,
      title: contract.title,
      description: contract.description || "Quality agricultural contract",
      price: contract.price,
      duration: contract.duration || 90,
      farmer: {
        fName: contract.farmer?.fName || "Unknown",
        lName: contract.farmer?.lName || "Farmer"
      },
      image: contract.image,
      area: contract.area
    }));

    res.json(enhancedContracts);
  } catch (error) {
    console.error("Contracts error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Authentication Routes
app.post("/api/signup", createUser);
app.post("/api/login", loginUser);
app.get("/api/contracts",showContracts);




// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));



