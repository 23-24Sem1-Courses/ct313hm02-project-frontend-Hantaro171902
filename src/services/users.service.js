function makeUsersService() {
  // ... other functions ...

  // Login
  async function loginUser(credentials) {
    return await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((res) => res.json());
  }

  return {
    loginUser
  };
}

export default makeUsersService;
