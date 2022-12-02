import request from "supertest";
import { createApp } from "@src/app.js";

describe("end to end testing", () => {
  it("create", async () => {
    const app = await createApp();
    const response = await request(app).post("/v1/recipe");
    expect(response.statusCode).toEqual(201);
  });
  it("read all", async () => {
    const app = await createApp();
    const response = await request(app).get("/v1/recipe");
    expect(response.statusCode).toEqual(200);
  });
  it("read one", async () => {
    const app = await createApp();
    const response = await request(app).get("/v1/recipe/1");
    expect(response.statusCode).toEqual(200);
  });
  it("update", async () => {
    const app = await createApp();
    const response = await request(app)
      .patch("/v1/recipe/63896202ff01f222ee2f9b14")
      .send({
        productName: "French fries",
        ingredients: [
          {
            name: "kentang mentah",
            quantityPurchase: 1000,
            cost: 27000,
            quantityUsed: 200,
          },
          {
            name: "saos",
            quantityPurchase: 1000,
            cost: 10000,
            quantityUsed: 10,
          },
        ],
        sellingPrice: 10000,
      });
    expect(response.statusCode).toEqual(200);
  });
  it("destroy", async () => {
    const app = await createApp();
    const response = await request(app).delete("/v1/recipe/1");
    expect(response.statusCode).toEqual(204);
  });
});
