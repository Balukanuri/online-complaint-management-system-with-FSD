// fixComplaints.js
const mongoose = require('mongoose');
const Complaint = require('./models/Complaint');

mongoose.connect('mongodb://127.0.0.1:27017/ocrms')
  .then(async () => {
    console.log('Connected to DB');

    // Fix bad status values
    const statusFix = await Complaint.updateMany(
      { status: 'Pending' },
      { $set: { status: 'pending' } }
    );
    console.log('Updated statuses:', statusFix.modifiedCount);

    // Fix missing titles
    const titleFix = await Complaint.updateMany(
      { $or: [ { title: { $exists: false } }, { title: "" } ] },
      { $set: { title: 'Untitled Complaint' } }
    );
    console.log('Fixed titles:', titleFix.modifiedCount);

    mongoose.disconnect();
  })
  .catch(err => console.error('Error:', err));
