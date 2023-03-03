<<<<<<< HEAD
import { gql, ApolloServer } from "apollo-server";
import createServer from "../tools/server";

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should retrieve a token", async () => {
    const getTokenMutation = gql`
      mutation GetToken($password: String!, $email: String!) {
        getToken(password: $password, email: $email)
      }
    `;

    const response = await server.executeOperation({
      query: getTokenMutation,
      variables: {
        password: "1234",
        email: "admin@admin.com",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.getToken).toBeDefined();
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
=======
import { gql, ApolloServer } from "apollo-server";
import createServer from "../tools/server";

describe("User resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should retrieve a token", async () => {
    const getTokenMutation = gql`
      mutation GetToken($password: String!, $email: String!) {
        getToken(password: $password, email: $email)
      }
    `;

    const response = await server.executeOperation({
      query: getTokenMutation,
      variables: {
        password: "1234",
        email: "admin@admin.com",
      },
    });

    expect(response.errors).toBeUndefined();
    expect(response.data?.getToken).toBeDefined();
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
>>>>>>> 19cf02bfeafce979ba3f4b9748043d1bd14ec38c
