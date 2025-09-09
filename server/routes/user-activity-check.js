const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { badges } = require("../config/badgesConfig");
const validate = require('../middleware/validation');
const { activityCheckSchema } = require('../validators/activityValidators');

router.post("/", validate(activityCheckSchema), async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Increment activity count (locally to check for badges)
    const nextActivityCount = (user.activityCount || 0) + 1;

    // Find new badges the user qualifies for
    const newBadges = [];
    badges.forEach(badge => {
      if (nextActivityCount >= badge.threshold && !user.badges.includes(badge.imageUrl)) {
        newBadges.push(badge.imageUrl);
      }
    });

    // Update atomically: increment activity and add new badges (if any)
    await User.updateOne(
      { _id: user._id },
      {
        $inc: { activityCount: 1 },//manual update may cause race conditions, hence using $inc and mongoDb will handle it
        $addToSet: { badges: { $each: newBadges } }
      }
    );

    res.json({
      message: "Activity updated"
    });
  } catch (err) {
    console.error("Error updating activity:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
