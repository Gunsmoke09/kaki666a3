const API_BASE_URL = 'https://ifn666.com/api';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const createCrudApi = (resource) => ({
  getAll: () => request(`/${resource}`),
  getById: (id) => request(`/${resource}/${id}`),
  create: (payload) =>
    request(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    request(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  delete: (id) =>
    request(`/${resource}/${id}`, {
      method: 'DELETE',
    }),
});

export const tutorialsApi = createCrudApi('tutorials');
export const materialsApi = createCrudApi('materials');

export const authApi = {
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
