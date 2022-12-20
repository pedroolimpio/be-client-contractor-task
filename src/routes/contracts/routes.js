const express = require('express');
const { getProfile } = require('../../middleware/getProfile');
const { getContract } = require('./cases/getContract');
const { getContracts } = require('./cases/getContracts');

const router = express.Router();

/**
 * @returns contracts by user
 */
router.get('/', getProfile, async (req, res) => res.json(await getContracts(req)));
/**
 * @returns contract by id
 */
router.get('/:id', getProfile, async (req, res) => res.json(await getContract(req)));

module.exports = router;
