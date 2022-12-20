const { QueryTypes } = require('sequelize');
const BadRequestException = require('../../../errors/BadRequest.exception');
const NotFoundException = require('../../../errors/NotFound.exception');
const { Job, Profile } = require('../../../model');
const { contractStatus } = require('../../../utils/utils');

const getJobs = async (req, id, profile) => {
  const sequelize = req.app.get('sequelize');
  return sequelize.query(
    `
        select j.*, c.ContractorId from Jobs j
        inner join Contracts c ON
        c.id = j.contractid
        where j.id = ${id}
        and c.clientid = ${profile.id}
        and c.status <> '${contractStatus.terminated}'
        and j.paid is null
        limit 1
      `,
    { type: QueryTypes.SELECT }
  );
};

module.exports.payJob = async (req, id, amount) => {
  const { profile } = req;

  if (profile.type !== 'client') {
    throw new BadRequestException('Job must be paid by a client');
  }

  const jobs = await getJobs(req, id, profile);

  if (!jobs.length) {
    throw new NotFoundException('Job not found or already full paid');
  }

  const job = jobs[0];

  if (job.price > amount) {
    throw new BadRequestException('Balance must be >= the amount');
  }

  job.paid = true;
  job.paymentDate = new Date();

  await Job.update(job, {
    where: {
      id,
    },
  });

  const contractor = await Profile.findOne({
    where: {
      id: job.ContractorId,
    },
  });

  contractor.balance += amount;

  await Profile.update(contractor, {
    where: {
      id: job.ContractorId,
    },
  });

  const client = await Profile.findOne({
    where: {
      id: profile.id,
    },
  });

  client.balance -= amount;

  await Profile.update(client, {
    where: {
      id: profile.id,
    },
  });
};
