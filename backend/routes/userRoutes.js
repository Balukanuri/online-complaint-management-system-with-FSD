// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

const { getUserComplaints } = require('../controllers/userController');

// ✅ Add this line:
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

// Route to get user complaints
router.get('/complaints', isAuthenticated, authorizeRoles('user'), getUserComplaints);

module.exports = router;