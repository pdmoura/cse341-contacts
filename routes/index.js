const express = require('express');
const router = express.Router();
const swagger = require("./swagger");

router.get('/', (req, res) => { res.send('Welcome to the Contacts API! Use /contacts in the URL to view data and /api-docs for the Swagger documentation.'); });

router.use('/contacts', require('./contacts'));

router.use('/', swagger);

module.exports = router;