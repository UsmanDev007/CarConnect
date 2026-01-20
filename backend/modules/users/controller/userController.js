import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(200).json({ message: "User Already Exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token (Valid for 1 day)
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "User Login Successfully",
      token, // Changed from JWT to token
      user: {
        // Wrapped fields in a user object
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
