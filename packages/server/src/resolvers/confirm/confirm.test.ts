import { User } from "@db/entity/User";
import createConfirmationLink from "@util/createConfirmationLink";
import { client } from "@util/redis";
import { SERVER_HOST } from "@util/secrets";
import request from "graphql-request";
import { mockReq } from "sinon-express-mock";

describe("confirm resolver", () => {
  const email = "marklar@gmail.com";
  const username = "marklar";
  const password = "foobar";
  const mutation = (id: string) => `
  mutation{
    confirm(id: "${id}")
  }
`;

  beforeEach(() => {
    client.flushall();
  });

  it("should return true when a correct registration ID is sent", async () => {
    const user = User.create({ email, password, username });

    await user.save();

    const req = mockReq();
    const link = await createConfirmationLink(user.id, client, req);
    const regex = new RegExp("(?<=/confirm/).+", "gi");
    const ids = link.match(regex);

    expect(ids).toHaveLength(1);

    const id = ids![0];
    const userID = await client.get(id);

    expect(userID).toBe(user.id);

    const response = await request(SERVER_HOST, mutation(id));

    expect(response.confirm).toBe(true);
  });

  it("should return false when an incorrect registration ID is sent", async () => {
    const user = User.create({ email, password, username });

    await user.save();

    const req = mockReq();
    await createConfirmationLink(user.id, client, req);

    const id = "test";
    let userID = await client.get(id);

    expect(userID).toBe(null);

    const response = await request(SERVER_HOST, mutation(id));

    expect(response.confirm).toBe(false);

    await client.set(id, "foobar");

    userID = await client.get(id);

    expect(userID).toBe("foobar");

    const response2 = await request(SERVER_HOST, mutation(id));

    expect(response2.confirm).toBe(false);
  });
});
