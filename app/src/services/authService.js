import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from './api';

export const login = async (username, password) => {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  const token = data?.token || data?.accessToken;
  if (token) {
    await AsyncStorage.setItem('authToken', token);
  }

  return data;
};

export const register = async (username, password) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};

export const getStoredToken = async () => AsyncStorage.getItem('authToken');
