import { QueryTypes } from "sequelize";

import { Database } from "@server/database";

type UseCaseParams = {
  params: any;
};

export const getDatabaseTimeUseCase = async ({ params }: UseCaseParams) => {
  const query: any = await Database.query(`SELECT CURRENT_TIMESTAMP AS time`, {
    type: QueryTypes.SELECT,
  });

  return {
    database: query[0].time,
    params,
  };
};
