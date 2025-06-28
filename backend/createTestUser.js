const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const createTestUser = async () => {
  const users = [
    { name: 'User1', email: 'user1@ocrms.com', password: 'user123', role: 'user' },
    { name: 'Agent1', email: 'agent1@ocrms.com', password: 'agent123', role: 'agent' }
  ];

  for (let u of users) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      u.password = await bcrypt.hash(u.password, 10);
      await User.create(u);
      console.log(`Created: ${u.name}`);
    } else {
      console.log(`${u.email} already exists.`);
    }
  }

  process.exit();
};

createTestUser();
