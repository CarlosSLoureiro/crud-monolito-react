import { Database } from "@server/database";

export abstract class StatusService {
  static async getDatabaseTime() {
    const query = await Database.query(`SELECT CURRENT_TIMESTAMP AS time`);
    return {
      database: query[0].time,
    };
  }
}
