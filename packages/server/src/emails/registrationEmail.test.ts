import registrationEmail from "@emails/registrationEmail";

describe("registrationEmail", () => {
  it("should return a correct string", () => {
    const test = "marklar";

    const result = registrationEmail(test).includes(test);

    expect(result).toBe(true);
  });
});
