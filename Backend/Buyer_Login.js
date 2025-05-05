import express from "express";
 import mongoose from "mongoose";
 import bcrypt from "bcryptjs";
 import jwt from "jsonwebtoken";
 import cors from "cors";
 
 const app = express();
 app.use(express.json());
 app.use(cors());
 
 // MongoDB Connection
 mongoose.connect("mongodb://localhost:27017/Buyer_Login", {
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
 
 const profileSchema = new mongoose.Schema({
   name: String,
   surname: String,
   email: String,
   phone: String,
   pincode: String,
   image: String,
 });
 
 const User = mongoose.model("User", userSchema, "users"); // Collection name: "users"
 const Profile = mongoose.model("Profile", profileSchema, "profiles"); // Collection name: "profiles"
 
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
 
 const fetchProfile = async (req, res) => {
   try {
     const profile = await Profile.findOne();
     res.status(200).json(profile || {});
   } catch (error) {
     console.error("Failed to fetch profile:", error);
     res.status(500).json({ message: "Failed to fetch profile" });
   }
 };
 
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

 

 
 
 // Routes
 app.post("/api/signup", createUser);
 app.post("/api/login", loginUser);
 app.get("/api/profile", fetchProfile);
 app.post("/api/profile", saveProfile);
 
 // Error-handling middleware
 app.use((err, req, res, next) => {
   console.error("Server error:", err);
   res.status(500).json({ message: "Internal server error" });
 });
 
 // Handle 404 (invalid endpoint)
 app.use((req, res) => {
   res.status(404).json({ message: "Endpoint not found" });
 });
 
 // Start Server
 app.listen(5000, () => console.log("Server running on port 5000"));