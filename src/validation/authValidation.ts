import { Form } from '../types/Form';
import { Error } from '../types/Error';

export const isError = (field: keyof Form, error: Error) => {
  switch (true) {
    case field === 'email' && error === Error.EMAIL:
    case field === 'repeatedPassword' && error === Error.PASSWORDS:
      return true;
    default:
      return false;
  }
};

export const renderErrorMessage = (field: string, error: Error): string => {
  if (field === 'email' && error === Error.EMAIL) {
    return Error.EMAIL;
  }

  if (field === 'repeatedPassword' && error === Error.PASSWORDS) {
    return Error.PASSWORDS;
  }

  return '';
};

export const isEmailValid = (email: string) => {
  const emailRegex = /\S+@\S+\.\S+/;

  return emailRegex.test(email);
};
