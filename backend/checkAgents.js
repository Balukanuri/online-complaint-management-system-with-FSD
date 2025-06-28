// backend/checkAgents.js
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/ocrms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const agents = await User.find({ role: 'agent' });
  console.log('Agents:', agents);
  mongoose.disconnect();
}).catch(err => {
  console.error('DB error:', err);
});
