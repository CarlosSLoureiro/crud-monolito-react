import { Database } from "@server/database";

import { StatusService } from "@server/services/status";

jest.mock(`@server/database`, () => ({
  Database: {
    query: jest.fn(),
  },
}));

const DatabaseMock = Database as jest.Mocked<typeof Database>;

describe(`StatusService`, () => {
  describe(`getDatabaseTime`, () => {
    it(`should return the current database time`, async () => {
      // Arrange
      const time = `2021-01-01T00:00:00.000Z`;

      // Mock
      DatabaseMock.query.mockResolvedValue([{ time }]);

      // Act
      const result = await StatusService.getDatabaseTime();

      // Assert
      expect(Database.query).toHaveBeenCalledWith(`SELECT CURRENT_TIMESTAMP AS time`);
      expect(result).toEqual({ database: time });
    });
  });
});
