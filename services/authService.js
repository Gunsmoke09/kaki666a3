import { apiRequest } from './api';
import { setToken } from './tokenService';

export async function login(username, password) {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (!response?.token) {
    throw new Error('Login succeeded but no token was returned by the API.');
  }

  setToken(response.token);
  return response;
}

export async function register(username, password) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}
