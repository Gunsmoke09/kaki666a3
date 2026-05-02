import { apiRequest } from './api';

export const getTutorials = async () => {
  const data = await apiRequest('/tutorials');
  return Array.isArray(data) ? data : [];
};

export const getTutorialById = async (id) => {
  return apiRequest(`/tutorials/${id}`);
};
