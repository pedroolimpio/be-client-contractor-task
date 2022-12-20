const NotFoundException = require('../../../errors/NotFound.exception');
const { getContractJoinField } = require('../../../utils/utils');

module.exports.getContract = async req => {
  const { Contract } = req.app.get('models');
  const { profile, params } = req;

  const { id } = params;

  const joinField = getContractJoinField(profile);
  const whereClause = { where: { id, [joinField]: profile.id } };

  const contract = await Contract.findOne(whereClause);

  if (!contract) {
    throw new NotFoundException('Contract not found');
  }

  return contract;
};
