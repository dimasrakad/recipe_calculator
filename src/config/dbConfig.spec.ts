import { dbConfig } from "@src/config/dbConfig.js";

it("should have properties", async () => {
  expect(await dbConfig()).not.toBeNull();
});