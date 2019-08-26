import { User } from "@db/entity/User";
import createConfirmationLink from "@util/createConfirmationLink";
import { redis } from "@util/redis";
import { SERVER_HOST } from "@util/secrets";
import request from "graphql-request";
import { mockReq } from "sinon-express-mock";

describe("confirm resolver", () => {
  const email = "marklar@gmail.com";
  const username = "marklar";
  const password = "foobar";
  const req = mockReq({
    headers: {
      host: "foobar"
    }
  });
  const mutation = (id: string) => `
  mutation{
    confirm(id: "${id}")
  }
`;

  beforeEach(() => {
    redis.flushall();
  });

  it("should return true when a correct registration ID is sent", async () => {
    const user = User.create({ email, password, username });

    await user.save();

    const link = await createConfirmationLink(user.id, redis, req);
    const regex = new RegExp("(?<=/confirm/).+", "gi");
    const ids = link.match(regex);

    expect(ids).toHaveLength(1);

    const id = ids![0];
    const userID = await redis.get(id);

    expect(userID).toBe(user.id);

    const response = await request(SERVER_HOST, mutation(id));

    await user.reload();

    expect(response.confirm).toBe(true);
    expect(user.confirmed).toBe(true);
  });

  it("should return false when an incorrect registration ID is sent", async () => {
    const user = User.create({ email, password, username });

    await user.save();

    await createConfirmationLink(user.id, redis, req);

    const id = "test";
    let userID = await redis.get(id);

    expect(userID).toBe(null);

    const response = await request(SERVER_HOST, mutation(id));

    await user.reload();

    expect(response.confirm).toBe(false);
    expect(user.confirmed).toBe(false);

    await redis.set(id, "foobar");

    userID = await redis.get(id);

    expect(userID).toBe("foobar");

    const response2 = await request(SERVER_HOST, mutation(id));

    await user.reload();

    expect(response2.confirm).toBe(false);
    expect(user.confirmed).toBe(false);
  });
});
