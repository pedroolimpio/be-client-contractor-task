// ***POST*** `/balances/deposit/:userId` - Deposits money into the the the balance of a client,
// a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

const { QueryTypes } = require('sequelize');
const BadRequestException = require('../../../errors/BadRequest.exception');
const { Profile } = require('../../../model');

module.exports.deposit = async req => {
  const { params, body } = req;

  const { userId } = params;

  const sequelize = req.app.get('sequelize');

  const results = await sequelize.query(
    `
    select COALESCE(pending_payment * 1.25, 0) as max_amount, 
    COALESCE(pending_payment * 0.25, 0) max_deposit
    from 
    (select sum(j.price) as pending_payment from Contracts c
    inner join Jobs j ON
    c.id = j.contractid
    where c.clientid = ${userId}
    and c.status <> 'terminated'
    and j.paid is null) as tmp
  `,
    { type: QueryTypes.SELECT }
  );

  const values = results[0];

  if (body.amount > values.max_deposit) {
    throw new BadRequestException(`Max amount to deposit is ${values.max_deposit}`);
  }

  const clientToDeposit = await Profile.findOne({
    where: {
      id: userId,
    },
  });

  clientToDeposit.balance += body.amount;

  await Profile.update(clientToDeposit, {
    where: {
      id: userId,
    },
  });
};
