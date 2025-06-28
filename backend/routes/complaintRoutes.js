const express = require('express');
const router = express.Router();

const { createComplaint } = require('../controllers/complaintController');
const { isAuthenticated, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', isAuthenticated, authorizeRoles('user'), createComplaint);

module.exports = router;
