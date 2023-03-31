import { Error } from './Error';

export interface AuthFormState {
  username: string;
  email: string;
  password: string;
  activeField: string;
  error: Error;
  isRegistered: boolean;
  isLoading: boolean;
  [key: string]: string | boolean | Error;
}
