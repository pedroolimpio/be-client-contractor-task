const getContractJoinField = profile => (profile.type === 'client' ? 'ClientId' : 'ContractorId');

module.exports = {
  getContractJoinField,
};
