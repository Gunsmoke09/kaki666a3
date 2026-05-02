import { apiRequest } from './api';

export const getCategories = async () => {
  const data = await apiRequest('/categories');
  return Array.isArray(data) ? data : [];
};

export const getCategoryById = async (id) => {
  return apiRequest(`/categories/${id}`);
};
