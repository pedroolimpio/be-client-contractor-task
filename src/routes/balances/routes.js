const express = require('express');
const { getProfile } = require('../../middleware/getProfile');
const { deposit } = require('./cases/deposit');

const router = express.Router();

router.post('/deposit/:userId', getProfile, async (req, res) => res.json(await deposit(req)));

module.exports = router;
