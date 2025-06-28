const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// backend/controllers/userController.js
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ createdBy: req.user.id }).populate('assignedTo', 'name');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: 'Server error fetching complaints' });
  }
};
