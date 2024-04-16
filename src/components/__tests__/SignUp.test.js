import { signUp } from '../../../__mocks__/signUpLogic.mock';

it('should successfully sign up a user', async () => {
  const email = 'valid@example.com';
  const password = 'correctPassword';
  const firstName = 'John'; // Provide a value for firstName
  const lastName = 'Doe'; // Provide a value for lastName

  await expect(signUp(email, password, firstName, lastName)).resolves.toEqual({
    uid: '123',
    email: 'valid@example.com',
    firstName: 'John', // Ensure that the expected firstName matches the provided value
    lastName: 'Doe', // Ensure that the expected lastName matches the provided value
  });
});