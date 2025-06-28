const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const createAdmin = async () => {
  const email = 'admin@ocrms.com';
  const password = 'admin123';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists.');
    process.exit();
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    name: 'Admin',
    email,
    password: hashed,
    role: 'admin'
  });

  console.log('Admin created.');
  process.exit();
};

createAdmin();
