import { User } from "@db/entity/User";
import { SERVER_HOST } from "@util/secrets";
import { request } from "graphql-request";

const email = "marklar@gmail.com";
const username = "marklar";
const password = "lebowski";

const mutation = `
  mutation{
  register(email: "${email}", username: "${username}", password: "${password}")
}
`;

describe("register register", () => {
  it("should create user in database and return true", async () => {
    const response = await request(SERVER_HOST, mutation);

    expect(response).toMatchObject({ register: true });
    const user = await User.findOne({ where: { email } });
    expect(user).toBeDefined();
    expect(user!.email).toBe(email);
    expect(user!.username).toBe(username);
    expect(user!.password).not.toBe(password);
  });

  it("should return false", async () => {
    const firstResponse = await request(SERVER_HOST, mutation);
    expect(firstResponse).toMatchObject({ register: true });

    const secondResponse = await request(SERVER_HOST, mutation);
    expect(secondResponse).toMatchObject({ register: false });
  });
});
