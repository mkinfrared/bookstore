import { User } from "@db/entity/User";
import { loginMutation, logoutMutation, registerMutation } from "@test/heplers";
import { SERVER_HOST } from "@util/secrets";
import request from "graphql-request";

const username = "marklar";
const email = "foo@bar.com";
const password = "foobar";

describe("logout resolver", () => {
  it("should destroy sessionID", async () => {
    await request(SERVER_HOST, registerMutation(email, password, username));
    await User.update({ confirmed: true }, { email });
    await request(SERVER_HOST, loginMutation(username, password));

    const response = await request(SERVER_HOST, logoutMutation());

    expect(response.logout).toBe(true);
  });
});
