const Complaint = require('../models/Complaint');
const User = require('../models/User');

// Get all complaints with user and assigned agent details
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('user', 'name email')
      .populate('assignedTo', 'name email');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Assign complaint to agent
const assignComplaint = async (req, res) => {
  try {
    const { complaintId, agentId } = req.body;

    if (!complaintId || !agentId) {
      return res.status(400).json({ msg: 'Missing complaintId or agentId' });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent') {
      return res.status(400).json({ msg: 'Invalid or non-agent user' });
    }

    complaint.assignedTo = agent._id;
    await complaint.save();

    res.status(200).json({ msg: 'Complaint assigned successfully' });
  } catch (error) {
    console.error('❌ Assignment error:', error);
    res.status(500).json({ msg: 'Server error during assignment' });
  }
};

// Get all users with role 'user'
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all users with role 'agent'
const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Export all functions properly
module.exports = {
  getAllComplaints,
  assignComplaint,
  getAllUsers,
  getAllAgents
};
