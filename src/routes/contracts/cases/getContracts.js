// GET /contracts - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

const { Op } = require('sequelize');
const { getContractJoinField } = require('../../../utils/utils');

module.exports.getContracts = async req => {
  const { Contract } = req.app.get('models');
  const { profile } = req;

  const joinField = getContractJoinField(profile);

  return Contract.findAll({
    where: {
      [joinField]: profile.id,
      status: { [Op.notIn]: ['terminated'] },
    },
    order: [['createdAt']],
  });
};
