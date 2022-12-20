const express = require('express');
const { getProfile } = require('../../middleware/getProfile');
const { bestClients } = require('./cases/bestClients');
const { bestProfession } = require('./cases/bestProfession');

const router = express.Router();

router.get('/best-profession', getProfile, async (req, res) => res.json(await bestProfession(req)));
router.get('/best-clients', getProfile, async (req, res) => {
  const filterOptions = {
    limit: +req.query.limit || 2,
    start: req.query.start,
    end: req.query.end,
  };

  return res.json(await bestClients(req, filterOptions));
});

module.exports = router;
