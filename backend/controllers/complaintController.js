const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = new Complaint({
      user: req.user.id,
      title,
      description,
      status: 'pending'
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('user', 'name email')
      .populate('assignedTo', 'name email');
    res.json(complaints);
  } catch (err) {
    console.error('Get all complaints error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
