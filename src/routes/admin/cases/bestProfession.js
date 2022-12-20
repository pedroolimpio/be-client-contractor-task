// ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the
// most money (sum of jobs paid) for any contactor that worked in the query time range.

const { QueryTypes } = require('sequelize');
const InternalServerErrorException = require('../../../errors/InternalServerError.exception');

module.exports.bestProfession = async req => {
  const { start, end } = req.query;

  const sequelize = req.app.get('sequelize');

  const results = await sequelize.query(
    `
    select profession, max(earn) earnings from 
    (select p.profession, sum(j.price) as earn from Jobs j
    inner join Contracts c ON
    c.id = j.contractid
    inner join Profiles p on 
    p.id = c.contractorid
    where j.paid is not null
    and p.type = 'contractor'
    ${start && end ? `and j.createdAt between '${start}' and '${end}'` : ''}
    group by p.profession) as tmp
    `,
    { type: QueryTypes.SELECT }
  );

  if (!results.length) {
    throw new InternalServerErrorException('Best profession does not match');
  }

  const maxProfession = results[0];

  return maxProfession;
};
