import { gql, ApolloServer } from "apollo-server";
import createServer from "../tools/server";

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should not retrieve a token", async () => {
    const getTokenMutation = gql`
      mutation GetToken($password: String!, $email: String!) {
        getToken(password: $password, email: $email)
      }
    `;

    const response = await server.executeOperation({
      query: getTokenMutation,
      variables: {
        password: "dkadaksgjg",
        email: "admin@admin.com",
      },
    });
    expect(response.errors).toBeDefined();
  });
});
