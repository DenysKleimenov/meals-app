/* eslint-disable arrow-body-style */
import { User } from '../types/User';
import { client } from '../utils/fetchClient';

export const signUp = (username: string, email: string, password: string) => {
  return client.post<User>('/auth/signup', { username, email, password });
};

export const signIn = (email: string, password: string) => {
  return client.post<User>('/auth/signin', { email, password });
};

export const activate = (activationToken: string) => {
  return client.get<User>(`/auth/activation/${activationToken}`);
};
