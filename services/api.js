const API_BASE_URL = 'http://localhost:3000';

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
    } catch (parseError) {
      data = null;
    }

    if (!response.ok) {
      const message = data?.message || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    return data;
  } catch (error) {
    if (error?.message?.includes('Network request failed')) {
      throw new Error('Cannot connect to the server. Please check if the API is running.');
    }

    throw error;
  }
}
