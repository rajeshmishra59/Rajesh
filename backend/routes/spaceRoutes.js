// 📁 D:\AppDevelopment\instay-app\backend\routes\spaceRoutes.js

const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

// ➕ Add a new space (bed)
router.post('/', spaceController.addSpace);

// 📋 Get all spaces (with optional filtering by status or sharingType)
router.get('/', spaceController.getAllSpaces);

// 🔍 Get a single space by ID
router.get('/:id', spaceController.getSpaceById);

// ✏️ Update a space by ID
router.put('/:id', spaceController.updateSpace);

// 🗑️ Delete a space by ID (use with caution)
router.delete('/:id', spaceController.deleteSpace);

module.exports = router;