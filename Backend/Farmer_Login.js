// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cors from "cors";
// import bodyParser from "body-parser";



// /// Initialize express app
// const app = express();

// // Use middleware
// app.use(express.json());

// const allowedOrigins = [
//   'https://contractfarming0.netlify.app',
//   'http://localhost:5173'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like curl or mobile apps)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   }, 
  
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   credentials: true
// }));
// mongoose.set('strictPopulate', false);




// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose.connect("mongodb+srv://khilesh:12345@cluster0.kbiwox8.mongodb.net/Farmer_Login", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected to 'Farmer_Login' database"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   fName: String,
//   lName: String,
//   email: String,
//   password: String,
// });


// // Profile Schema
// const profileSchema = new mongoose.Schema({
//   name: String,
//   surname: String,
//   email: String,
//   phone: String,
//   pincode: String,
//   image: String,
// });

// // Contract Schema
// const contractSchema = new mongoose.Schema({
//   image: String,
//   title: String,
//   area: String,
//   actionText: String,
//   actionLink: String,
//    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });



// // Land Schema
// const landSchema = new mongoose.Schema({
//   image: { type: String, required: true },
//   title: { type: String, required: true },
//   area: { type: String, required: true },
//   price: { type: String, required: true },
//   status: { 
//     type: String, 
//     enum: ['Available', 'Pre-book'], 
//     default: 'Available' 
//   },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });

// //Enhanced Negotiation Schema
// const negotiationSchema = new mongoose.Schema({
//   contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
//   buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // <-- this is required
//   proposedPrice: { type: Number},
//   message:{type: String,required: true},
//   status: { type: String, default: 'Pending' }
// });

// // const viewcontractdetails = new mongoose.Schema({
// //   contractId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
// //   buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   message: { type: String, required: true },
// //   status: { 
// //     type: String, 
// //     enum: ['pending', 'accepted', 'rejected', 'finalized', 'closed'],
// //     default: 'pending'
// //   },
// //   createdAt: { type: Date, default: Date.now }
// // });




// // Models
// const User = mongoose.model("User", userSchema, "users"); 
// const Profile = mongoose.model("Profile", profileSchema, "profiles"); 
// const Contract = mongoose.model("Contract", contractSchema, "contracts"); 
// const Land = mongoose.model("Land", landSchema);
// const Negotiation = mongoose.model('Negotiation', negotiationSchema);



// // Auth Middleware
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   try {
//     const decoded = jwt.verify(token, 'secretkey');
//     req.userId = decoded.id;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };


// // Create User
// const createUser = async (req, res) => {
//   const { fName, lName, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ fName, lName, email, password: hashedPassword });

//     const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Login User
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password);
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     console.log("checking");
//     const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Fetch Profile
// const fetchProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findOne();
//     res.status(200).json(profile || {});
//   } catch (error) {
//     console.error("Failed to fetch profile:", error);
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// };

// // Save Profile
// const saveProfile = async (req, res) => {
//   const { name, surname, email, phone, pincode, image } = req.body;
//   try {
//     let profile = await Profile.findOne();
//     if (profile) {
//       // Update existing profile
//       profile.name = name;
//       profile.surname = surname;
//       profile.email = email;
//       profile.phone = phone;
//       profile.pincode = pincode;
//       profile.image = image;
//     } else {
//       // Create new profile
//       profile = new Profile({ name, surname, email, phone, pincode, image });
//     }
//     await profile.save();
//     res.status(200).json(profile);
//   } catch (error) {
//     console.error("Failed to save profile:", error);
//     res.status(500).json({ message: "Failed to save profile" });
//   }
// };

// // Create Contract For Contract for farmers
// const createContract = async (req, res) => {
//   try {
//     const { image, title, area, actionText, actionLink } = req.body;

//     // Validate the incoming data
//     if (!image || !title || !area) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newContract = new Contract({
//       image,
//       title,
//       area,
//       actionText: actionText || "Add Info", // Default actionText if not provided
//       actionLink: actionLink || "#", // Default actionLink if not provided
//     });

//     await newContract.save();
//     res.status(201).json({ message: "Contract added successfully" });
//   } catch (error) {
//     console.error("Failed to save contract:", error);
//     res.status(500).json({ message: "Failed to save contract. Please try again." });
//   }
// };

// const showContracts = async(req,res)=>{
//   try{
//     let data = Contract.find({});
//     console.log(data);
//     res.status(200).json(data);
//   }catch(err){
//     res.status(500).json({message: "failed to fetch data"});
//   }
// }

// // Fix the showContracts endpoint
// app.get('/api/contracts', async (req, res) => {
//   try {
//       const contracts = await Contract.find();
//       res.status(200).json(contracts);
//   } catch (error) {
//       console.error('Error fetching contracts:', error);
//       res.status(500).json({ message: 'Failed to fetch contracts' });
//   }
// });

// // Improve delete endpoint
// app.delete('/api/contracts/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: 'Invalid contract ID format' });
//     }

//     const deletedContract = await Contract.findByIdAndDelete(id);
    
//     if (!deletedContract) {
//       return res.status(404).json({ message: 'Contract not found' });
//     }

//     res.status(200).json({
//       message: 'Contract deleted successfully',
//       deletedId: deletedContract._id
//     });
//   } catch (error) {
//     console.error('Error deleting contract:', error);
//     res.status(500).json({
//       message: 'Server error during deletion',
//       error: error.message
//     });
//   }
// });
// const handleDelete = async (id, endpoint, setter) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to delete item');
//     }

//     setter(prev => prev.filter(item => item._id !== id));
//     alert('Item deleted successfully!');
//   } catch (error) {
//     console.error('Delete error:', error);
//     alert(error.message || 'Error deleting item');
//   }
// };









// // Create Land (Keep authenticated for submission)
// app.post('/api/lands', authenticate, async (req, res) => {
//   try {
//     const { image, title, area, price, status } = req.body;
//     if (!image || !title || !area || !price) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newLand = new Land({
//       image,
//       title,
//       area,
//       price,
//       status: status || 'Available',
//       user: req.userId
//     });

//     await newLand.save();
//     res.status(201).json(newLand);
//   } catch (error) {
//     console.error('Error creating land:', error);
//     res.status(500).json({ message: 'Failed to create land' });
//   }
// });

// // Fetch All Lands (for display — no authenticate)
// app.get('/api/lands', async (req, res) => {
//   try {
//     const lands = await Land.find(); // No req.userId filter here
//     res.status(200).json(lands);
//   } catch (error) {
//     console.error('Error fetching lands:', error);
//     res.status(500).json({ message: 'Failed to fetch lands' });
//   }
// });

// // Delete land (with authentication)
// app.delete('/api/lands/:id', authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedLand = await Land.findByIdAndDelete(id);
//     if (!deletedLand) {
//       return res.status(404).json({ message: 'Land not found' });
//     }
//     res.json({ message: 'Land deleted', deletedId: deletedLand._id });
//   } catch (error) {
//     console.error('Error deleting land:', error);
//     res.status(500).json({ message: 'Failed to delete land' });
//   }
// });



// // Add to existing schemas
// const landRentSchema = new mongoose.Schema({
//   image: String,
//   title: String,
//   area: String,
//   monthlyRate: Number,
//   status: {
//     type: String,
//     enum: ['Available', 'Pre-book'],
//     default: 'Available'
//   },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { collection: 'land Rent' });

// const equipmentRentSchema = new mongoose.Schema({
//   image: String,
//   title: String,
//   type: String,
//   dailyRate: Number,
//   status: {
//     type: String,
//     enum: ['Available', 'Pre-book'],
//     default: 'Available'
//   },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// }, { collection: 'Equipment Rent' });



// const LandRent = mongoose.model('LandRent', landRentSchema);
// const EquipmentRent = mongoose.model('EquipmentRent', equipmentRentSchema);

// // Land Rent Routes
// app.get('/api/land-rent', async (req, res) => {
//   try {
//     const lands = await LandRent.find();
//     res.json(lands);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch land rentals' });
//   }
// });

// // Update routes to handle collection names with spaces
// app.post('/api/land-rent', authenticate, async (req, res) => {
//   try {
//     const newLand = new LandRent({
//       ...req.body,
//       user: req.userId,
//       monthlyRate: Number(req.body.monthlyRate) // Ensure number conversion
//     });
    
//     const savedLand = await newLand.save();
//     res.status(201).json(savedLand);
//   } catch (error) {
//     console.error('Land creation error:', error);
//     res.status(400).json({ 
//       message: 'Error creating land rental',
//       error: error.message
//     });
//   }
// });

// app.delete('/api/land-rent/:id', authenticate, async (req, res) => {
//   try {
//     await LandRent.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Land rental deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting land rental' });
//   }
// });

// // Equipment Rent Routes
// app.get('/api/equipment-rent', async (req, res) => {
//   try {
//     const equipment = await EquipmentRent.find();
//     res.json(equipment);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch equipment rentals' });
//   }
// });

// app.post('/api/equipment-rent', authenticate, async (req, res) => {
//   try {
//     const newEquipment = new EquipmentRent({
//       ...req.body,
//       user: req.userId,
//       dailyRate: Number(req.body.dailyRate) // Ensure number conversion
//     });
    
//     const savedEquipment = await newEquipment.save();
//     res.status(201).json(savedEquipment);
//   } catch (error) {
//     console.error('Equipment creation error:', error);
//     res.status(400).json({ 
//       message: 'Error creating equipment rental',
//       error: error.message
//     });
//   }
// });

// app.delete('/api/equipment-rent/:id', authenticate, async (req, res) => {
//   try {
//     await EquipmentRent.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Equipment rental deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting equipment rental' });
//   }
// });

// // In farmer_server.js
// app.post('/api/contracts', authenticate, async (req, res) => {
//   try {
//     const { image, title, description, price, duration, area } = req.body;
    
//     const newContract = new Contract({
//       image,
//       title,
//       description,
//       price: Number(price),
//       duration: Number(duration) || 90,
//       area,
//       farmer: req.userId
//     });

//     await newContract.save();
    
//     // Populate farmer info
//     const contractWithFarmer = await Contract.findById(newContract._id)
//       .populate('farmer', 'fName lName');

//     res.status(201).json(contractWithFarmer);
//   } catch (error) {
//     console.error("Contract creation error:", error);
//     res.status(500).json({ message: "Failed to create contract" });
//   }
// });


// // Add to negotiation routes
// app.get('/api/negotiations', authenticate, async (req, res) => {
//   // console.log("negotiation check");
//   try {
//     // console.log("User  -> ",req.userId);
//     const negotiations = await Negotiation.find({ farmer: "67e1003bb9ec252c052f44de" })
//       .populate('buyerId', 'fName lName email')
//       .populate('contractId', 'title price')
//       .sort({ createdAt: -1 });
//       // console.log("notification found",negotiations);
//     res.json(negotiations);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch negotiations' });
//   }
// });


// // Update negotiation endpoint
// app.post("/api/negotiations", authenticate, async (req, res) => {
//   console.log(req.body);
//   try {
//     const { contractId, message } = req.body;
    
//     // Validate request
//     if (!contractId || !message) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Find contract with farmer info
//     const contract = await Contract.findById(contractId).populate('farmer');
//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }
//     console.log("req  ",contract);
//     // Create negotiation
//     const negotiation = new Negotiation({
//       contractId: contractId,
//       buyerId: req.userId,    // Authenticated buyer ID
//       farmer: contract._id,
//       message,
//       status: "pending",
//       createdAt: new Date()
//     });

//     await negotiation.save();

//     // Populate response data
//     const result = await Negotiation.findById(negotiation._id)
//       .populate('buyer', 'fName lName email')
//       .populate('farmer', 'fName lName email')
//       .populate('contract', 'title price');

//     res.status(201).json(result);
    
//   } catch (error) {
//     console.error("Negotiation error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



// app.get("/NegotiationDetails/:id",(req,res)=>{
//   let id=req.params;
//   console.log(id);
//   res.send("working");
// })


// // Add this endpoint to your existing server.js
// app.get('/api/farmers', authenticate, async (req, res) => {
//   try {
//     // Fetch all farmers (users) excluding passwords
//     const farmers = await User.find({}, { password: 0 });
//     res.json(farmers);
//   } catch (error) {
//     console.error('Error fetching farmers:', error);
//     res.status(500).json({ message: 'Failed to fetch farmers' });
//   }
// });


// // For faster executiomn of login or other onrender 
// app.get("/health", (req, res) => {
//   res.status(200).send("OK");
// });





// // Routes
// app.post("/api/signup", createUser);
// app.post("/api/login", loginUser);
// app.get("/api/profile", fetchProfile);
// app.post("/api/profile", saveProfile);
// app.post("/api/contracts", createContract);
// app.get("/api/contracts",showContracts);
// app.get("/api/contracts",handleDelete);



// // Error-handling middleware
// app.use((err, req, res, next) => {
//   console.error("Server error:", err);
//   res.status(500).json({ message: "Internal server error" });
// });

// // Handle 404 (invalid endpoint)
// app.use((req, res) => {
//   res.status(404).json({ message: "Endpoint not found.." });
// });

// // Start Server
// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

  









































import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const router = express.Router();

// ==================== INCREASED PAYLOAD LIMIT ====================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = [
  'https://contractfarming0.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// ==================== DATABASE CONNECTION ====================
mongoose.set('strictPopulate', false);
mongoose.connect("mongodb+srv://khilesh:12345@cluster0.kbiwox8.mongodb.net/Farmer_Login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// ==================== SCHEMA DEFINITIONS ====================
const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['farmer', 'buyer'], required: true }
});

const profileSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    unique: true
  },
  name: String,
  surname: String,
  phone: String,
  pincode: String,
  image: String,
  role: { type: String, enum: ['farmer', 'buyer'], required: true }
}, { timestamps: true });

const contractSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
  duration: Number,
  area: String,
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

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

const negotiationSchema = new mongoose.Schema({
  contractId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Contract', 
    required: true 
  },
  buyerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  farmer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // CHANGED FROM 'Farmer' to 'User'
    required: true 
  },
  proposedPrice: { 
    type: Number, 
    required: true
  },
  message: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], // CHANGED TO LOWERCASE
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});


// ==================== MODEL DEFINITIONS ====================
const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);
const Contract = mongoose.model("Contract", contractSchema);
const Land = mongoose.model("Land", landSchema);
const LandRent = mongoose.model('LandRent', landRentSchema);
const EquipmentRent = mongoose.model('EquipmentRent', equipmentRentSchema);
const Negotiation = mongoose.model('Negotiation', negotiationSchema);

// ==================== MIDDLEWARE ====================
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  
  try {
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    
    req.user = user;
    req.userId = user._id;
    req.userRole = user.role;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: `Forbidden: ${role} access only` });
  }
  next();
};

// ==================== AUTHENTICATION ROUTES ====================
// app.post("/api/signup", async (req, res) => {
//   try {
//     const { fName, lName, email, password, role } = req.body;
    
//     if (!['farmer', 'buyer'].includes(role)) {
//       return res.status(400).json({ message: "Invalid role specified" });
//     }
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ 
//       fName, 
//       lName, 
//       email, 
//       password: hashedPassword,
//       role
//     });

//     res.status(201).json({ message: "Signup successful" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
//     res.json({ 
//       token,
//       role: user.role,
//       name: `${user.fName} ${user.lName}`
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


app.post("/api/signup", async (req, res) => {
  try {
    const { fName, lName, email, password, role } = req.body;
    
    if (!['farmer', 'buyer'].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ 
      fName, 
      lName, 
      email, 
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password, role } = req.body; // Add role to login request
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user role matches login portal
    if (user.role !== role) {
      return res.status(401).json({ 
        message: `You are registered as a ${user.role}, please use the ${user.role} login portal` 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ 
      token,
      role: user.role,
      name: `${user.fName} ${user.lName}`
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ==================== PROFILE ROUTES ====================
app.get("/api/profile", authenticate, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.userId })
      .populate('user', 'email role');
    
    if (profile) {
      const profileData = profile.toObject();
      profileData.email = profile.user.email;
      profileData.role = profile.user.role;
      res.json(profileData);
    } else {
      res.json({
        name: "",
        surname: "",
        phone: "",
        pincode: "",
        image: "",
        email: req.user.email,
        role: req.user.role
      });
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

app.put("/api/profile", authenticate, async (req, res) => {
  try {
    const { name, surname, phone, pincode, image } = req.body;
    
    if (!name || !surname || !phone || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    let profile = await Profile.findOne({ user: req.userId });
    
    if (!profile) {
      profile = new Profile({
        user: req.userId,
        name,
        surname,
        phone,
        pincode,
        image,
        role: req.user.role
      });
    } else {
      profile.name = name;
      profile.surname = surname;
      profile.phone = phone;
      profile.pincode = pincode;
      profile.image = image;
    }

    await profile.save();
    
    const populatedProfile = await Profile.findById(profile._id).populate('user', 'email role');
    
    const responseData = {
      ...populatedProfile.toObject(),
      email: populatedProfile.user.email,
      role: populatedProfile.user.role
    };

    res.json(responseData);
  } catch (error) {
    console.error("Failed to save profile:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: Object.values(error.errors).map(e => e.message).join(', ')
      });
    }
    
    res.status(500).json({ 
      message: error.message || "Failed to save profile" 
    });
  }
});

// ==================== FARMER ROUTES ====================
app.post("/api/farmer/contracts", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const { image, title, description, price, duration, area } = req.body;
    
    if (!image || !title || !price || !area) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newContract = new Contract({
      image,
      title,
      description,
      price: Number(price),
      duration: Number(duration) || 90,
      area,
      farmer: req.user._id
    });

    await newContract.save();
    
    const contractWithFarmer = await Contract.findById(newContract._id)
      .populate('farmer', 'fName lName');

    res.status(201).json(contractWithFarmer);
  } catch (error) {
    console.error("Contract creation error:", error);
    res.status(500).json({ message: "Failed to create contract" });
  }
});

app.get("/api/farmer/contracts", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const contracts = await Contract.find({ farmer: req.user._id });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contracts" });
  }
});

app.delete("/api/farmer/contracts/:id", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const contract = await Contract.findOneAndDelete({ 
      _id: req.params.id, 
      farmer: req.user._id 
    });
    
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }
    
    res.json({ message: "Contract deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contract" });
  }
});

app.post("/api/farmer/lands", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const { image, title, area, price, status } = req.body;
    
    if (!image || !title || !area || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const land = await Land.create({ 
      image, 
      title, 
      area, 
      price, 
      status: status || 'Available',
      user: req.user._id 
    });
    
    res.status(201).json(land);
  } catch (error) {
    res.status(500).json({ message: "Failed to create land" });
  }
});

app.get("/api/farmer/lands", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const lands = await Land.find({ user: req.user._id });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lands" });
  }
});

app.delete("/api/farmer/lands/:id", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const land = await Land.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    
    if (!land) {
      return res.status(404).json({ message: "Land not found" });
    }
    
    res.json({ message: "Land deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete land" });
  }
});

app.post("/api/farmer/land-rent", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const { image, title, area, monthlyRate, status } = req.body;
    
    const newLand = new LandRent({
      image,
      title,
      area,
      monthlyRate,
      status: status || 'Available',
      user: req.user._id
    });
    
    await newLand.save();
    res.status(201).json(newLand);
  } catch (error) {
    res.status(500).json({ message: "Failed to create land rental" });
  }
});

app.get("/api/farmer/land-rent", authenticate, requireRole('farmer'), async (req, res) => {
  console.log("check")
  try {
    const lands = await LandRent.find({ user: req.user._id });
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch land rentals" });
  }
});

app.delete("/api/farmer/land-rent/:id", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    await LandRent.findByIdAndDelete(req.params.id);
    res.json({ message: "Land rental deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete land rental" });
  }
});

app.post("/api/farmer/equipment-rent", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const { image, title, type, dailyRate, status } = req.body;
    
    const newEquipment = new EquipmentRent({
      image,
      title,
      type,
      dailyRate,
      status: status || 'Available',
      user: req.user._id
    });
    
    await newEquipment.save();
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create equipment rental" });
  }
});

app.get("/api/farmer/equipment-rent", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const equipment = await EquipmentRent.find({ user: req.user._id });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment rentals" });
  }
});

app.delete("/api/farmer/equipment-rent/:id", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    await EquipmentRent.findByIdAndDelete(req.params.id);
    res.json({ message: "Equipment rental deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete equipment rental" });
  }
});

app.get("/api/farmer/notifications", authenticate, requireRole('farmer'), async (req, res) => {
  try {
    const negotiations = await Negotiation.find({ farmer: req.user._id })
      .populate('buyerId', 'fName lName email')
      .populate('contractId', 'title price')
      .sort({ createdAt: -1 });
    res.json(negotiations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

// ==================== BUYER ROUTES ====================
app.get("/api/buyer/contracts", authenticate, requireRole('buyer'), async (req, res) => {
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
    res.status(500).json({ message: "Failed to fetch contracts" });
  }
});

// app.post("/api/buyer/negotiations", authenticate, requireRole('buyer'), async (req, res) => {
//   try {
//     const { contractId, message, proposedPrice } = req.body;
//     const contract = await Contract.findById(contractId);
    
//     if (!contract) {
//       return res.status(404).json({ message: "Contract not found" });
//     }
    
//     const negotiation = new Negotiation({
//       contractId,
//       buyerId: req.user._id,
//       farmer: contract.farmer,
//       message,
//       proposedPrice,
//       status: "Pending"
//     });

//     await negotiation.save();
    
//     const result = await Negotiation.findById(negotiation._id)
//       .populate('buyerId', 'fName lName email')
//       .populate('farmer', 'fName lName email')
//       .populate('contractId', 'title price');

//     res.status(201).json(result);
//   } catch (error) {
//     console.error("Negotiation error:", error);
//     res.status(500).json({ message: "Failed to create negotiation" });
//   }
// });

// app.get("/api/negotiations", authenticate, requireRole('buyer'), async (req, res) => {
//   console.log("check")
//   try {
//     const negotiations = await Negotiation.find({ buyerId: req.user._id })
//       .populate('contractId', 'title price')
//       .populate('farmer', 'fName lName')
//       .sort({ createdAt: -1 });
//       console.log(negotiations)
//     res.json(negotiations);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch negotiations" });
//   }
// });

// app.get("/api/negotiations", authenticate, async (req, res) => {
//   console.log("check")
//   try {
//     let query = {};
    
//     if (req.userType === 'farmer') {
//       query = { farmer: req.userId };
//     } else if (req.userType === 'buyer') {
//       query = { buyerId: req.userId };
//     }

//     const negotiations = await Negotiation.find(query)
//       .populate('buyerId', 'fName lName email')
//       .populate('farmer', 'fName lName email')
//       .populate('contractId', 'title price')
//       .sort({ createdAt: -1 });

//     res.json(negotiations);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch negotiations' });
//   }
// });

// app.get("/api/negotiationDetails/:id", authenticate, async (req, res) => {
//   try {
//     const negotiation = await Negotiation.findById(req.params.id)
//       .populate('buyerId', 'fName lName email phone')
//       .populate('farmer', 'fName lName email phone')
//       .populate('contractId', 'title price description image');

//     if (!negotiation) {
//       return res.status(404).json({ message: "Negotiation not found" });
//     }

//     if (negotiation.farmer._id.toString() !== req.userId && 
//         negotiation.buyerId._id.toString() !== req.userId) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     res.json(negotiation);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.put("/api/negotiations/:id/status", authenticate, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const negotiation = await Negotiation.findById(req.params.id);

//     if (!negotiation) {
//       return res.status(404).json({ message: "Negotiation not found" });
//     }

//     if (negotiation.farmer.toString() !== req.userId) {
//       return res.status(403).json({ message: "Only farmer can update status" });
//     }

//     negotiation.status = status;
//     await negotiation.save();

//     res.json(negotiation);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update negotiation" });
//   }
// });


// Remove duplicate GET endpoint and keep this one:
app.get("/api/negotiations", authenticate, async (req, res) => {
  try {
    let query = {};
    
    if (req.userType === 'farmer') {
      query = { farmer: req.userId };
    } else if (req.userType === 'buyer') {
      query = { buyerId: req.userId };
    }

    const negotiations = await Negotiation.find(query)
      .populate('buyerId', 'fName lName email')
      .populate('farmer', 'fName lName email')
      .populate('contractId', 'title price')
      .sort({ createdAt: -1 });

    res.json(negotiations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch negotiations' });
  }
});

// Add authentication middleware to the POST endpoint
router.post('/api/buyer/negotiations', authenticate, async (req, res) => {
  try {
    const { contractId, message, proposedPrice } = req.body;
    
    // Validate input
    if (!contractId || !message || !proposedPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newNegotiation = new Negotiation({
      contract: contractId,
      buyer: req.user.id, // From authentication middleware
      message,
      proposedPrice,
      status: 'pending'
    });

    await newNegotiation.save();
    res.status(201).json(newNegotiation);
  } catch (error) {
    console.error('Error saving negotiation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// ==================== NEGOTIATION ENDPOINTS ====================
app.post("/api/buyer/negotiations", authenticate, requireRole('buyer'), async (req, res) => {
  try {
    const { contractId, message, proposedPrice } = req.body;
    
    // Validate input
    if (!contractId || !message || !proposedPrice) {
      return res.status(400).json({ 
        message: "Missing required fields: contractId, message, or proposedPrice" 
      });
    }

    // Validate contractId format
    if (!mongoose.Types.ObjectId.isValid(contractId)) {
      return res.status(400).json({ message: "Invalid contract ID format" });
    }

    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    // Validate farmer exists on contract
    if (!contract.farmer || !mongoose.Types.ObjectId.isValid(contract.farmer)) {
      return res.status(400).json({ 
        message: "Contract is missing a valid farmer reference" 
      });
    }

    // Verify farmer exists in database
    const farmerExists = await User.exists({ _id: contract.farmer });
    if (!farmerExists) {
      return res.status(400).json({ message: "Farmer associated with contract not found" });
    }

    // Create negotiation with all required fields
    const negotiation = new Negotiation({
      contractId,
      buyerId: req.user._id,
      farmer: contract.farmer,
      message,
      proposedPrice,
      status: "pending"
    });

    await negotiation.save();
    
    // Return the created negotiation with populated data
    const result = await Negotiation.findById(negotiation._id)
      .populate('buyerId', 'fName lName email')
      .populate('farmer', 'fName lName email')
      .populate('contractId', 'title price');

    res.status(201).json(result);
  } catch (error) {
    console.error("Negotiation creation error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => ({
        field: e.path,
        message: e.message
      }));
      return res.status(400).json({ 
        message: "Validation failed",
        errors 
      });
    }
    
    res.status(500).json({ message: "Failed to create negotiation" });
  }
});
// FIXED status update endpoint
app.put("/api/negotiations/:id/:action", authenticate, async (req, res) => {
  try {
    const { id, action } = req.params;
    const validActions = ['accept', 'reject']; // REMOVED 'counter' since not in enum
    
    if (!validActions.includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }
    
    const negotiation = await Negotiation.findById(id);
    if (!negotiation) {
      return res.status(404).json({ message: "Negotiation not found" });
    }
    
    // Update status with LOWERCASE values
    negotiation.status = action === 'accept' ? 'accepted' : 'rejected';
    
    await negotiation.save();
    res.json(negotiation);
  } catch (error) {
    console.error("Negotiation update error:", error);
    res.status(500).json({ message: "Failed to update negotiation" });
  }
});


// ==================== FARMER FETCH ENDPOINT ====================
app.get("/api/users/farmers", authenticate, async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' })
      .select('fName lName email location image');
    
    res.json(farmers.map(farmer => ({
      _id: farmer._id,
      name: `${farmer.fName} ${farmer.lName}`,
      email: farmer.email,
      location: farmer.location,
      image: farmer.image
    })));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch farmers" });
  }
});



// ==================== PUBLIC MARKETPLACE ROUTES ====================
app.get("/api/contracts", async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('farmer', 'fName lName')
      .sort({ createdAt: -1 });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contracts" });
  }
});

app.get("/api/lands", async (req, res) => {
  try {
    const lands = await Land.find()
      .populate('user', 'fName lName');
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lands" });
  }
});

app.get("/api/land-rent", async (req, res) => {
  try {
    const lands = await LandRent.find()
    .populate('user', 'fName lName');
    res.json(lands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch land rentals" });
  }
});

app.get("/api/equipment-rent", async (req, res) => {
  try {
    const equipment = await EquipmentRent.find()
      .populate('user', 'fName lName');
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment rentals" });
  }
});

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// ==================== SERVER START ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});