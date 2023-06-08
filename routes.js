const express = require('express');
const path = require('path');

const router = express.Router();

//html file
const index = path.resolve(__dirname, './build/index.html');

router.post('/send', (req, res) => {
	//처리로직
});

router.get('*', (req, res) => {
    res.sendFile(index);
});

module.exports = router;