// backend/routes/agentRoutes.js
const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');
const { getAssignedComplaints, updateComplaintStatus } = require('../controllers/agentController');

// ✅ These should not be undefined
router.get('/complaints', isAuthenticated, authorizeRoles('agent'), getAssignedComplaints);
router.put('/complaints/:id', isAuthenticated, authorizeRoles('agent'), updateComplaintStatus);

module.exports = router;
