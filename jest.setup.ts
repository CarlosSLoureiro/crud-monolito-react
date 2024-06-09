import "@server/database/mocks";

import "@testing-library/jest-dom";

jest.mock(`uuid`, () => ({ v4: () => `uuid-v4` }));
