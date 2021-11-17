import axios from "axios";

test("Authenticate seller", async () => {
  const response = await axios.post(`http://localhost:3334/sellers/auth`);

  expect(response.status).toEqual(200);
});

test("Create new seller", async () => {
  const response = await axios.post(`http://localhost:3334/sellers`);

  expect(response.status).toEqual(201);
});

test("Get cashback from seller", async () => {
  const response = await axios.get(`http://localhost:3334/sellers/cashback`);

  expect(response.status).toEqual(200);
});