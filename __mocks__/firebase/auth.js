export const signInWithEmailAndPassword = jest.fn((auth, email, password) => {
  if (password === "correctPassword") {
    return Promise.resolve({ user: { uid: "123", email } })
  } else {
    return Promise.reject(new Error("auth/wrong-password"))
  }
})

export const onAuthStateChanged = jest.fn()