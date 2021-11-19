import App from "../../app";
import TYPES from "../../types";
import AuthenticateServiceInterface from "../../services/authenticate.service.interface";
import { sellerExample } from "../tools";
import bcrypt from "bcryptjs";

jest.mock("bcryptjs");

describe("authenticate service", () => {
  const app = new App();
  let authenticateService: AuthenticateServiceInterface;

  beforeEach(async () => {
    authenticateService = app.container.get<AuthenticateServiceInterface>(
      TYPES.AuthenticateServiceInterface
    );
  });

  it("getToken", async () => {
    (bcrypt.compare as jest.Mock).mockImplementation(() =>
      Promise.resolve(true)
    );

    const token = await authenticateService.getToken("123456", sellerExample);
    expect(typeof token).toBe("string");
  });

  it("don't get token if password is wrong", async () => {
    (bcrypt.compare as jest.Mock).mockImplementation(() =>
      Promise.resolve(false)
    );

    await expect(
      authenticateService.getToken("123456", sellerExample)
    ).rejects.toThrowError("Password don't match.");
  });
});
