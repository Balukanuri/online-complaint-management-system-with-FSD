const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await User.deleteMany();

    const users = [
      {
        name: 'Admin',
        email: 'admin@ocrms.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin'
      },
      {
        name: 'Agent1',
        email: 'agent1@ocrms.com',
        password: await bcrypt.hash('agent123', 10),
        role: 'agent'
      },
      {
        name: 'User1',
        email: 'user1@ocrms.com',
        password: await bcrypt.hash('user123', 10),
        role: 'user'
      }
    ];

    await User.insertMany(users);
    console.log('Seeded users!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
