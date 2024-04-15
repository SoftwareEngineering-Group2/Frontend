import { signInWithEmailAndPassword } from '../../../__mocks__/firebase/auth'

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