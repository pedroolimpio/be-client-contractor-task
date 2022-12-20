// 1. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

const { QueryTypes } = require('sequelize');
const { contractStatus } = require('../../../utils/utils');

module.exports.getUnpaid = async req => {
  const sequelize = req.app.get('sequelize');

  const { profile } = req;

  const jobs = await sequelize.query(
    `
    select j.* from Jobs j
    inner join Contracts c ON
    c.id = j.contractid
    where j.paid is null
    and (c.clientid = ${profile.id} or c.contractorid = ${profile.id})
    and c.status = '${contractStatus.inProgress}'
  `,
    { type: QueryTypes.SELECT }
  );

  return jobs;
};
