const express = require('express');
const { getProfile } = require('../../middleware/getProfile');

const router = express.Router();

/**
 * @returns contract by id
 */
// router.get('/:id', getProfile, async (req, res) => res.json(await getContract(req)));

module.exports = router;
