const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { badges } = require("../badgesConfig");

router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Increment activity count
    user.activityCount = (user.activityCount || 0) + 1;

    // Collect new badges
    const newBadges = [];
    badges.forEach(badge => {
      if (user.activityCount >= badge.threshold && !user.badges.includes(badge.imageUrl)) {
        newBadges.push(badge.imageUrl);
      }
    });

    if (newBadges.length > 0) {
      // Atomic update to avoid duplicates
      await User.updateOne(
        { _id: user._id },
        { $addToSet: { badges: { $each: newBadges } }, $set: { activityCount: user.activityCount } }
      );
    } else {
      // If no new badges, just update activityCount
      await User.updateOne(
        { _id: user._id },
        { $set: { activityCount: user.activityCount } }
      );
    }

    res.json({ message: "Activity updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
