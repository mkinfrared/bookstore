export const confirmMutation = (id: string) => `
  mutation{
    confirm(id: "${id}")
  }
`;

export const currentUserMutation = () => `
  query {
    currentUser {
      id
      username
      email
    }
  }
`;

export const loginMutation = (username: string, password: string) => `
    mutation {
      login(username: "${username}", password: "${password}") {
        path
        message
      }
    }
  `;

export const logoutMutation = () => `
  mutation {
    logout
  }
`;

export const registerMutation = (
  email: string,
  password: string,
  username: string
) => `
  mutation{
  register(email: "${email}", username: "${username}", password: "${password}") {
    path
    message
  }
}
`;
