import { User } from "@db/entity/User";
import { emailNotVerified, invalidLogin } from "@messages/messages";
import { mutation as register } from "@resolvers/register/register.test";
import { redis } from "@util/redis";
import { SERVER_HOST } from "@util/secrets";
import request from "graphql-request";

describe("login resolver", () => {
  const username = "marklar";
  const email = "marklar@test.com";
  const password = "foobar";
  const mutation = (u: string, p: string) => `
    mutation {
      login(username: "${u}", password: "${p}") {
        path
        message
      }
    }
  `;

  beforeEach(async () => {
    await request(SERVER_HOST, register(email, password, username));
    await redis.flushall();
  });

  it("should return null with valid credentials", async () => {
    const user = await User.findOne({ where: { username } });

    expect(user).toBeDefined();

    user!.confirmed = true;
    await user!.save();

    const response = await request(SERVER_HOST, mutation(username, password));

    expect(response.login).toBe(null);
  });

  it("should return error with invalid password", async () => {
    const user = await User.findOne({ where: { username } });

    expect(user).toBeDefined();

    user!.confirmed = true;
    await user!.save();

    const response = await request(SERVER_HOST, mutation(username, "password"));

    expect(response.login[0].message).toBe(invalidLogin);
    expect(response.login[0].path).toBe("username");
  });

  it("should return error with invalid username", async () => {
    const user = await User.findOne({ where: { username } });

    expect(user).toBeDefined();

    user!.confirmed = true;
    await user!.save();

    const response = await request(SERVER_HOST, mutation("username", password));

    expect(response.login[0].message).toBe(invalidLogin);
    expect(response.login[0].path).toBe("username");
  });

  it("should return error when email is not confirmed", async () => {
    const user = await User.findOne({ where: { username } });

    expect(user).toBeDefined();

    const response = await request(SERVER_HOST, mutation(username, password));

    expect(response.login[0].message).toBe(emailNotVerified);
    expect(response.login[0].path).toBe("username");
  });
});
