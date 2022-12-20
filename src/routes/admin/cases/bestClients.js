// ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` -
// returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.

const { QueryTypes } = require('sequelize');
const InternalServerErrorException = require('../../../errors/InternalServerError.exception');

module.exports.bestClients = async (req, filterOptions) => {
  const sequelize = req.app.get('sequelize');

  const { start, end, limit } = filterOptions;

  const results = await sequelize.query(
    `
    select id, fullName, sum(paid) paid from 
    (select p.id, trim(p.firstname || ' ' ||  p.lastname) as fullName, j.price as paid from Jobs j
    inner join Contracts c ON
    c.id = j.contractid
    inner join Profiles p on 
    p.id = c.contractorid
    where j.paid is not null
    ${start && end ? `and j.createdAt between '${start}' and '${end}'` : ''}) tmp
    group by id, fullName
    order by sum(paid) desc
    limit ${limit}
    `,
    { type: QueryTypes.SELECT }
  );

  if (!results.length) {
    throw new InternalServerErrorException('Best clients does not match');
  }

  return results;
};
