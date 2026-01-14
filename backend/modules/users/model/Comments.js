import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DealerCar",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },
    
    userRole: {
      type: String,
      enum: ["User", "Dealer", "Admin"],
      default: "User",
    },

    // The actual comment text
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, 
    },
  },
  { 
    timestamps: true 
  }
);

commentSchema.index({ carId: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;