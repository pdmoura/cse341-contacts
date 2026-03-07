const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { res.send('Welcome to the Contacts API! Use /contacts in the URL to view data.');});

router.use('/contacts', require('./contacts'));

module.exports = router;