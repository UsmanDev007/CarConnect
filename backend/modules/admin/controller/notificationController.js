import Notification from "../model/Notification.js";

export const getMyNotifications = async (req, res) => {
  try {
    // Check which ID was attached by the middleware
    const userId = req.adminId || req.dealerId;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request" });
    }

    const notifications = await Notification.find({ recipient: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
