import axios from "axios";

test("Create new purchase", async () => {
  const response = await axios.post(`http://localhost:3334/purchases`);

  expect(response.status).toEqual(201);
});

test("Update purchase", async () => {
  const response = await axios.put(`http://localhost:3334/purchases`);

  expect(response.status).toEqual(204);
});

test("Show all purchases", async () => {
  const response = await axios.get(`http://localhost:3334/purchases`);

  expect(response.status).toEqual(200);
});

test("Delete purchase", async () => {
  const response = await axios.delete(`http://localhost:3334/purchases`);

  expect(response.status).toEqual(204);
});
