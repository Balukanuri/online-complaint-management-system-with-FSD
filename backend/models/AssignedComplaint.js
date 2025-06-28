const mongoose = require('mongoose');

const AssignedComplaintSchema = new mongoose.Schema({
  complaint: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AssignedComplaint', AssignedComplaintSchema);
