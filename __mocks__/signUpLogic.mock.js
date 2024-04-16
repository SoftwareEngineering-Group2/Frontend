export const signUp = jest.fn((email, password, firstName, lastName) => {
  if (email === 'valid@example.com' && password === 'correctPassword' && firstName && lastName) {
    return Promise.resolve({ uid: '123', email, firstName, lastName });
  } else {
    return Promise.reject(new Error('Error creating user.'));
  }
});