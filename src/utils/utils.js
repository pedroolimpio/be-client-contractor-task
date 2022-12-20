const getContractJoinField = profile => (profile.type === 'client' ? 'ClientId' : 'ContractorId');

const contractStatus = {
  new: 'new',
  inProgress: 'in_progress',
  terminated: 'terminated',
};

module.exports = {
  getContractJoinField,
  contractStatus,
};
