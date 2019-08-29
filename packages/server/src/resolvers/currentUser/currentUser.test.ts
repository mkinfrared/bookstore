require("fetch-cookie/node-fetch")(require("node-fetch"));
import { User } from "@db/entity/User";
import {
  currentUserMutation,
  loginMutation,
  logoutMutation,
  registerMutation
} from "@test/heplers";
import { SERVER_HOST } from "@util/secrets";
import { GraphQLClient } from "graphql-request";
// import  from "fetch-cookie";
// import axios from "axios";

const username = "marklar";
const email = "foo@bar.com";
const password = "foobar";

const client = new GraphQLClient(SERVER_HOST, {
  credentials: "include"
});

describe("currentUser resolver", () => {
  it("should return a user object when user is logged in", async () => {
    expect(2).toBe(1);
  });

  it("should return null when user is not logged in", async () => {
    await client.request(registerMutation(email, password, username));

    const user = await User.findOne({ where: { email } });
    user!.confirmed = true;

    await user!.save();
    await client.request(loginMutation(username, password));

    const response = await client.request(currentUserMutation());
    expect(response.currentUser).toBeDefined();

    await client.request(logoutMutation());
    const response2 = await client.request(currentUserMutation());
    expect(response2.currentUser).toBeNull();
  });
});
