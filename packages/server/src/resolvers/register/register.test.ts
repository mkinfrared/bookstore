import { User } from "@db/entity/User";
import { SERVER_HOST } from "@util/secrets";
import { request } from "graphql-request";

const email = "marklar@gmail.com";
const username = "marklar";
const password = "foobar";

export const mutation = (e: string, p: string, u: string) => `
  mutation{
  register(email: "${e}", username: "${u}", password: "${p}") {
    path
    message
  }
}
`;

describe("register resolver", () => {
  it("should create user in database and return null", async () => {
    const response = await request(
      SERVER_HOST,
      mutation(email, password, username)
    );

    expect(response).toMatchObject({ register: null });
    const user = await User.findOne({ where: { email } });
    expect(user).toBeDefined();
    expect(user!.email).toBe(email);
    expect(user!.username).toBe(username);
    expect(user!.password).not.toBe(password);
  });

  it("should return Error like type", async () => {
    const response = await request(
      SERVER_HOST,
      mutation(email, password, username)
    );
    expect(response).toMatchObject({ register: null });

    const response2 = await request(
      SERVER_HOST,
      mutation(email, password, username)
    );
    expect(response2.register).toHaveLength(1);
    expect(response2.register[0].path).toBe("email");

    const mail = "redrum@mail.com";

    const response3 = await request(
      SERVER_HOST,
      mutation(mail, password, username)
    );
    expect(response3.register).toHaveLength(1);
    expect(response3.register[0].path).toBe("username");
  });

  it("should return Error like type when email already exists", async () => {
    const response = await request(
      SERVER_HOST,
      mutation(email, password, username)
    );
    expect(response).toMatchObject({ register: null });

    const response2 = await request(
      SERVER_HOST,
      mutation(email, password, username)
    );
    expect(response2.register).toHaveLength(1);
    expect(response2.register[0].path).toBe("email");
  });

  it("should return Error like type when username already exists", async () => {
    const response = await request(
      SERVER_HOST,
      mutation(email, password, username)
    );

    expect(response).toMatchObject({ register: null });

    const mail = "redrum@mail.com";
    const response2 = await request(
      SERVER_HOST,
      mutation(mail, password, username)
    );

    expect(response2.register).toHaveLength(1);
    expect(response2.register[0].path).toBe("username");
  });

  it("should validate the inputs", async () => {
    const mail = "redrum";
    const pass = "foo";
    const name = "bar";

    const response = await request(SERVER_HOST, mutation(mail, pass, name));
    expect(response.register).toHaveLength(3);
    expect(response.register[0].path).toBe("email");
    expect(response.register[1].path).toBe("password");
    expect(response.register[2].path).toBe("username");
  });
});
