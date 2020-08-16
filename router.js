const express = require('express');
const router = express.Router();

// Set up routes
router.get('/', (req, res) => {
    res.send('Message server is up and running!').status(200);
});

module.exports = router;