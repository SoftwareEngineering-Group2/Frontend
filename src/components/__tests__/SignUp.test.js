import { signUp } from '../../../__mocks__/signUpLogic.mock'

it('should fail to sign up a user with invalid credentials', async () => {
  const email = 'valid@example.com'
  const password = 'invalidPassword'
  const firstName = 'Johnny'
  const lastName = 'Does'

  await expect(signUp(email, password, firstName, lastName)).rejects.toThrow('Error creating user.')
})

it('should successfully sign up a user', async () => {
  const email = 'valid@example.com';
  const password = 'correctPassword';
  const firstName = 'John'
  const lastName = 'Doe'

  await expect(signUp(email, password, firstName, lastName)).resolves.toEqual({
    uid: '123',
    email: 'valid@example.com',
    firstName: 'John',
    lastName: 'Doe',
  })
})