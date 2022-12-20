const express = require('express');
const { getProfile } = require('../../middleware/getProfile');
const { getUnpaid } = require('./cases/getUnpaid');

const router = express.Router();

/**
 * @returns get unpaid contracts by profile
 */
router.get('/unpaid', getProfile, async (req, res) => res.json(await getUnpaid(req)));

module.exports = router;
