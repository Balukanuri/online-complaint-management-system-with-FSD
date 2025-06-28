const express = require('express');
const router = express.Router();

const { getAllComplaints, assignComplaint, getAllUsers, getAllAgents } = require('../controllers/adminController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/complaints', isAuthenticated, authorizeRoles('admin'), getAllComplaints);
router.post('/assign', isAuthenticated, authorizeRoles('admin'), assignComplaint);
router.get('/users', isAuthenticated, authorizeRoles('admin'), getAllUsers);
router.get('/agents', isAuthenticated, authorizeRoles('admin'), getAllAgents);

module.exports = router;
