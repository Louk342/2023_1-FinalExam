const express = require('express');
const path = require('path');
const router = express.Router();

const index = path.resolve(__dirname, './build/index.html');

router.post('/send', (req, res) => {});

router.get('*', (req, res) => {
    res.sendFile(index);
});

module.exports = router;