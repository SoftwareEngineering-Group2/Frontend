export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
  if (password === "correctPassword") {
    return Promise.resolve({ user: { uid: "123", email } })
  } else {
    return Promise.reject(new Error("auth/wrong-password"))
  }
})

export const onAuthStateChanged = jest.fn()

export const createUserWithEmailAndPassword = jest.fn((auth, email, password) => {
  if (email === "valid@example.com" && password === "correctPassword") {
    return Promise.resolve({
      user: {
        uid: "123",
        email
      }
    });
  } else {
    return Promise.reject(new Error("firebase/auth: Error creating user."));
  }
});

// Update or include mocks for updating user names
export const updateUsernames = jest.fn((uid, firstName, lastName) => {
  return Promise.resolve({
    data: { uid, firstName, lastName },
    status: 200
  });
});