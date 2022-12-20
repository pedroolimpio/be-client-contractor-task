const express = require('express');
const NotFoundException = require('../errors/NotFound.exception');
const { getProfile } = require('../middleware/getProfile');

const router = express.Router();

/**
 * @returns contract by id
 */
router.get('/contracts/:id', getProfile, async (req, res) => {
  const { Contract } = req.app.get('models');
  const { profile, params } = req;

  const { id } = params;

  const joinField = profile.type === 'client' ? 'ClientId' : 'ContractorId';
  const whereClause = { where: { id, [joinField]: profile.id } };

  const contract = await Contract.findOne(whereClause);

  if (!contract) {
    throw new NotFoundException('Contract not found');
  }

  return res.json(contract);
});

module.exports = router;
