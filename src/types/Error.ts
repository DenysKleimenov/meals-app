export enum Error {
  NONE,
  EMAIL = 'The email is in the wrong format or empty',
  PASSWORDS = 'Passwords are not identical',
  EXISTS = 'User with this email already exists',
  INCORRECT = 'Wrong email or password',
}
