import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const buildHeaders = async (customHeaders = {}) => {
  const token = await AsyncStorage.getItem('authToken');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
};

const parseErrorMessage = (status, body) => {
  if (body?.message) return body.message;

  if (status >= 500) return 'Server error. Please try again shortly.';
  if (status === 404) return 'Requested resource was not found.';
  if (status === 401) return 'You are not authorized. Please log in again.';
  if (status === 400) return 'Invalid request. Please check your input and try again.';

  return 'Something went wrong. Please try again.';
};

export const apiRequest = async (endpoint, options = {}) => {
  if (!API_BASE_URL) {
    throw new Error('API base URL is not configured. Please check your .env file.');
  }

  try {
    const headers = await buildHeaders(options.headers);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const rawText = await response.text();
    let data;
    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(parseErrorMessage(response.status, data));
    }

    return data;
  } catch (error) {
    if (error?.message?.includes('Network request failed')) {
      throw new Error('Cannot connect to server. Please check your internet connection and try again.');
    }

    throw new Error(error.message || 'Request failed. Please try again.');
  }
};
