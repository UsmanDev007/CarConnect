import Comment from "../model/Comments.js";

// 1. ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { carId, text } = req.body;

    // Create the comment using the user info from your JWT middleware
    const newComment = new Comment({
      carId,
      user: req.userId,      // ID from JWT
      userName: req.userName, // Name from JWT (saves a database look-up later)
      text,
    });

    const savedComment = await newComment.save();
    
    // Optional: You can trigger that Dealer Notification here!
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error posting comment", error: error.message });
  }
};

// 2. GET COMMENTS FOR ONE CAR
export const getCarComments = async (req, res) => {
  try {
    const { carId } = req.params;
    
    // Find all comments for this specific car and sort by newest first
    const comments = await Comment.find({ carId })
      .sort({ createdAt: -1 })
      .populate('user', 'name'); // If you need extra user info like profile pic

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};