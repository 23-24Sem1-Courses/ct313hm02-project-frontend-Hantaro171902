function makeUsersService() {
  // ... other functions ...
  const headers = {
    'Content-Type': 'application/json'
  };
  // Login
  async function loginUser(credentials) {
    return await fetch('/api/users/login', {
      method: 'POST',
      headers,
      body: JSON.stringify(credentials)
    }).then((res) => res.json());
  }

  async function signinUser(credentials) {
    return await fetch('/api/users', {
      method: 'POST',
      headers,
      body: JSON.stringify(credentials)
    }).then((res) => res.json());
  }

  return {
    loginUser,
    signinUser
  };
}

export default makeUsersService;
