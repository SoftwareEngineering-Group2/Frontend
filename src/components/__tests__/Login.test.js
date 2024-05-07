import { signInWithEmailAndPassword } from '../../../__mocks__/firebase/auth'

export const onAuthStateChanged = jest.fn((auth, callback) => {
  const user = { uid: '123', email: 'test@example.com' }
  callback(user)
})

describe('Firebase Authentication', () => {
  it('successfully signs in with correct password', async () => {
    const email = 'test@example.com'
    const password = 'correctPassword'
    await expect(signInWithEmailAndPassword(null, email, password)).resolves.toEqual({
      user: expect.objectContaining({
        uid: '123',
        email,
      }),
    })
  })

  it('fails to sign in with incorrect password', async () => {
    const email = 'test@example.com'
    const password = 'wrongPassword'
    await expect(signInWithEmailAndPassword(null, email, password)).rejects.toThrow("auth/wrong-password")
  })
})

describe('Auth State Change', () => {
  it('calls callback with user object when auth state changes', () => {
    const mockCallback = jest.fn()
    onAuthStateChanged(null, mockCallback)
    expect(mockCallback).toHaveBeenCalledWith(expect.objectContaining({
      uid: '123',
      email: 'test@example.com',
    }))
  })
})