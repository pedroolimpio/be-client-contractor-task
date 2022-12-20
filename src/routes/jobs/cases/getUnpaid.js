// 1. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

const { Op } = require('sequelize');

module.exports.getUnpaid = async req => {
  const { Contract, Job } = req.app.get('models');
  const { profile } = req;

  const unpaidContracts = await Contract.findAll({
    where: {
      status: 'in_progress',
      [Op.or]: [{ ClientId: profile.id }, { ContractorId: profile.id }],
    },
    include: {
      model: Job,
    },
  });

  return unpaidContracts;
};
