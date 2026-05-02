const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.100:4000/api';

function buildFriendlyError(error) {
  if (error?.message?.includes('Network request failed')) {
    return new Error('Cannot connect to the server. Check that the API is running and EXPO_PUBLIC_API_BASE_URL points to your computer\'s local network IP.');
  }

  return error;
}

export async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message = data?.message || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw buildFriendlyError(error);
  }
}

export { API_BASE_URL };
