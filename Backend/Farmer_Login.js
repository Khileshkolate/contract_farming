import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";



/// Initialize express app
const app = express();

// Use middleware
app.use(express.json());

const allowedOrigins = [
  'https://contractfarming0.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl or mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }, 
  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
mongoose.set('strictPopulate', false);




app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://khilesh:12345@cluster0.kbiwox8.mongodb.net/Farmer_Login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected to 'Farmer_Login' database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
});

// Profile Schema
const profileSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  pincode: String,
  image: String,
});

// Contract Schema
const contractSchema = new mongoose.Schema({
  image: String,
  title: String,
  area: String,
  actionText: String,
  actionLink: String,
   farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});



// Land Schema
const landSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  area: { type: String, required: true },
  price: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Pre-book'], 
    default: 'Available' 
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

//Enhanced Negotiation Schema
const negotiationSchema = new mongoose.Schema({
  contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // <-- this is required
  proposedPrice: { type: Number},
  message:{type: String,required: true},
  status: { type: String, default: 'Pending' }
});

// const viewcontractdetails = new mongoose.Schema({
//   contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
//   buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   message: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ['pending', 'accepted', 'rejected', 'finalized', 'closed'],
//     default: 'pending'
//   },
//   createdAt: { type: Date, default: Date.now }
// });




// Models
const User = mongoose.model("User", userSchema, "users"); 
const Profile = mongoose.model("Profile", profileSchema, "profiles"); 
const Contract = mongoose.model("Contract", contractSchema, "contracts"); 
const Land = mongoose.model("Land", landSchema);
const Negotiation = mongoose.model('Negotiation', negotiationSchema);



// Auth Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


// Create User
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

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("checking");
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch Profile
const fetchProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile || {});
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

// Save Profile
const saveProfile = async (req, res) => {
  const { name, surname, email, phone, pincode, image } = req.body;
  try {
    let profile = await Profile.findOne();
    if (profile) {
      // Update existing profile
      profile.name = name;
      profile.surname = surname;
      profile.email = email;
      profile.phone = phone;
      profile.pincode = pincode;
      profile.image = image;
    } else {
      // Create new profile
      profile = new Profile({ name, surname, email, phone, pincode, image });
    }
    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    console.error("Failed to save profile:", error);
    res.status(500).json({ message: "Failed to save profile" });
  }
};

// Create Contract For Contract for farmers
const createContract = async (req, res) => {
  try {
    const { image, title, area, actionText, actionLink } = req.body;

    // Validate the incoming data
    if (!image || !title || !area) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newContract = new Contract({
      image,
      title,
      area,
      actionText: actionText || "Add Info", // Default actionText if not provided
      actionLink: actionLink || "#", // Default actionLink if not provided
    });

    await newContract.save();
    res.status(201).json({ message: "Contract added successfully" });
  } catch (error) {
    console.error("Failed to save contract:", error);
    res.status(500).json({ message: "Failed to save contract. Please try again." });
  }
};

const showContracts = async(req,res)=>{
  try{
    let data = Contract.find({});
    console.log(data);
    res.status(200).json(data);
  }catch(err){
    res.status(500).json({message: "failed to fetch data"});
  }
}

// Fix the showContracts endpoint
app.get('/api/contracts', async (req, res) => {
  try {
      const contracts = await Contract.find();
      res.status(200).json(contracts);
  } catch (error) {
      console.error('Error fetching contracts:', error);
      res.status(500).json({ message: 'Failed to fetch contracts' });
  }
});

// Improve delete endpoint
app.delete('/api/contracts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contract ID format' });
    }

    const deletedContract = await Contract.findByIdAndDelete(id);
    
    if (!deletedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({
      message: 'Contract deleted successfully',
      deletedId: deletedContract._id
    });
  } catch (error) {
    console.error('Error deleting contract:', error);
    res.status(500).json({
      message: 'Server error during deletion',
      error: error.message
    });
  }
});
const handleDelete = async (id, endpoint, setter) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete item');
    }

    setter(prev => prev.filter(item => item._id !== id));
    alert('Item deleted successfully!');
  } catch (error) {
    console.error('Delete error:', error);
    alert(error.message || 'Error deleting item');
  }
};









// Create Land (Keep authenticated for submission)
app.post('/api/lands', authenticate, async (req, res) => {
  try {
    const { image, title, area, price, status } = req.body;
    if (!image || !title || !area || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newLand = new Land({
      image,
      title,
      area,
      price,
      status: status || 'Available',
      user: req.userId
    });

    await newLand.save();
    res.status(201).json(newLand);
  } catch (error) {
    console.error('Error creating land:', error);
    res.status(500).json({ message: 'Failed to create land' });
  }
});

// Fetch All Lands (for display — no authenticate)
app.get('/api/lands', async (req, res) => {
  try {
    const lands = await Land.find(); // No req.userId filter here
    res.status(200).json(lands);
  } catch (error) {
    console.error('Error fetching lands:', error);
    res.status(500).json({ message: 'Failed to fetch lands' });
  }
});

// Delete land (with authentication)
app.delete('/api/lands/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLand = await Land.findByIdAndDelete(id);
    if (!deletedLand) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.json({ message: 'Land deleted', deletedId: deletedLand._id });
  } catch (error) {
    console.error('Error deleting land:', error);
    res.status(500).json({ message: 'Failed to delete land' });
  }
});



// Add to existing schemas
const landRentSchema = new mongoose.Schema({
  image: String,
  title: String,
  area: String,
  monthlyRate: Number,
  status: {
    type: String,
    enum: ['Available', 'Pre-book'],
    default: 'Available'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'land Rent' });

const equipmentRentSchema = new mongoose.Schema({
  image: String,
  title: String,
  type: String,
  dailyRate: Number,
  status: {
    type: String,
    enum: ['Available', 'Pre-book'],
    default: 'Available'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { collection: 'Equipment Rent' });



const LandRent = mongoose.model('LandRent', landRentSchema);
const EquipmentRent = mongoose.model('EquipmentRent', equipmentRentSchema);

// Land Rent Routes
app.get('/api/land-rent', async (req, res) => {
  try {
    const lands = await LandRent.find();
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch land rentals' });
  }
});

// Update routes to handle collection names with spaces
app.post('/api/land-rent', authenticate, async (req, res) => {
  try {
    const newLand = new LandRent({
      ...req.body,
      user: req.userId,
      monthlyRate: Number(req.body.monthlyRate) // Ensure number conversion
    });
    
    const savedLand = await newLand.save();
    res.status(201).json(savedLand);
  } catch (error) {
    console.error('Land creation error:', error);
    res.status(400).json({ 
      message: 'Error creating land rental',
      error: error.message
    });
  }
});

app.delete('/api/land-rent/:id', authenticate, async (req, res) => {
  try {
    await LandRent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Land rental deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting land rental' });
  }
});

// Equipment Rent Routes
app.get('/api/equipment-rent', async (req, res) => {
  try {
    const equipment = await EquipmentRent.find();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch equipment rentals' });
  }
});

app.post('/api/equipment-rent', authenticate, async (req, res) => {
  try {
    const newEquipment = new EquipmentRent({
      ...req.body,
      user: req.userId,
      dailyRate: Number(req.body.dailyRate) // Ensure number conversion
    });
    
    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    console.error('Equipment creation error:', error);
    res.status(400).json({ 
      message: 'Error creating equipment rental',
      error: error.message
    });
  }
});

app.delete('/api/equipment-rent/:id', authenticate, async (req, res) => {
  try {
    await EquipmentRent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Equipment rental deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting equipment rental' });
  }
});

// In farmer_server.js
app.post('/api/contracts', authenticate, async (req, res) => {
  try {
    const { image, title, description, price, duration, area } = req.body;
    
    const newContract = new Contract({
      image,
      title,
      description,
      price: Number(price),
      duration: Number(duration) || 90,
      area,
      farmer: req.userId
    });

    await newContract.save();
    
    // Populate farmer info
    const contractWithFarmer = await Contract.findById(newContract._id)
      .populate('farmer', 'fName lName');

    res.status(201).json(contractWithFarmer);
  } catch (error) {
    console.error("Contract creation error:", error);
    res.status(500).json({ message: "Failed to create contract" });
  }
});


// Add to negotiation routes
app.get('/api/negotiations', authenticate, async (req, res) => {
  // console.log("negotiation check");
  try {
    // console.log("User  -> ",req.userId);
    const negotiations = await Negotiation.find({ farmer: "67e055237071a2bd8f9fad7b" })
      .populate('buyerId', 'fName lName email')
      .populate('contractId', 'title price')
      .sort({ createdAt: -1 });
      // console.log("notification found",negotiations);
    res.json(negotiations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch negotiations' });
  }
});


// Update negotiation endpoint
app.post("/api/negotiations", authenticate, async (req, res) => {
  console.log(req.body);
  try {
    const { contractId, message } = req.body;
    
    // Validate request
    if (!contractId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find contract with farmer info
    const contract = await Contract.findById(contractId).populate('farmer');
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    console.log("req  ",contract);
    // Create negotiation
    const negotiation = new Negotiation({
      contractId: contractId,
      buyerId: req.userId,    // Authenticated buyer ID
      farmer: contract._id,
      message,
      status: "pending",
      createdAt: new Date()
    });

    await negotiation.save();

    // Populate response data
    const result = await Negotiation.findById(negotiation._id)
      .populate('buyer', 'fName lName email')
      .populate('farmer', 'fName lName email')
      .populate('contract', 'title price');

    res.status(201).json(result);
    
  } catch (error) {
    console.error("Negotiation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// // Get single negotiation with populated data
// app.get('/api/negotiations/:id', authenticate, async (req, res) => {
//   try {
//     const negotiation = await Negotiation.findById(req.params.id)
//       .populate('buyerId', 'fName lName email')
//       .populate('contractId', 'title price area')
//       .populate('farmer', 'fName lName email');

//     if (!negotiation) {
//       return res.status(404).json({ message: 'Negotiation not found' });
//     }

//     res.json(negotiation);
//   } catch (error) {
//     console.error('Error fetching negotiation:', error);
//     res.status(500).json({ message: 'Failed to fetch negotiation' });
//   }
// });

// // Update negotiation status
// app.put('/api/negotiations/:id/status', authenticate, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const validStatuses = ['pending', 'accepted', 'rejected', 'finalized', 'closed'];

//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     const updatedNegotiation = await Negotiation.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     )
//       .populate('buyerId', 'fName lName email')
//       .populate('contractId', 'title price area');

//     if (!updatedNegotiation) {
//       return res.status(404).json({ message: 'Negotiation not found' });
//     }

//     res.json(updatedNegotiation);
//   } catch (error) {
//     console.error('Error updating negotiation:', error);
//     res.status(500).json({ message: 'Failed to update negotiation' });
//   }
// });
app.get("/NegotiationDetails/:id",(req,res)=>{
  let id=req.params;
  console.log(id);
  res.send("working");
})




// Routes
app.post("/api/signup", createUser);
app.post("/api/login", loginUser);
app.get("/api/profile", fetchProfile);
app.post("/api/profile", saveProfile);
app.post("/api/contracts", createContract);
app.get("/api/contracts",showContracts);
app.get("/api/contracts",handleDelete);



// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Handle 404 (invalid endpoint)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found.." });
});

// Start Server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


  

