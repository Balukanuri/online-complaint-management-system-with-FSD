// backend/controllers/agentController.js
const Complaint = require('../models/Complaint');

exports.getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ assignedTo: req.user._id });
    res.json(complaints);
  } catch (err) {
    console.error('Error fetching assigned complaints:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// backend/controllers/agentController.js

exports.updateComplaintStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    // ✅ Fix: check if assignedTo exists first
    if (!complaint.assignedTo || complaint.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to update this complaint' });
    }

    complaint.status = status;
    await complaint.save();

    res.json({ msg: 'Status updated' });
  } catch (err) {
    console.error('Failed to update complaint status:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
