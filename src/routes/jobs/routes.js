const express = require('express');
const { getProfile } = require('../../middleware/getProfile');
const { getUnpaid } = require('./cases/getUnpaid');
const { payJob } = require('./cases/payJob');

const router = express.Router();

/**
 * @returns get unpaid contracts by profile
 */
router.get('/unpaid', getProfile, async (req, res) => res.json(await getUnpaid(req)));
router.post('/:jobId/pay', getProfile, async (req, res) => {
  const { jobId } = req.params;
  const { amount } = req.body;
  return res.json(await payJob(req, jobId, amount));
});

module.exports = router;
