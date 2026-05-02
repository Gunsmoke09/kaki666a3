import { apiRequest } from './api';

export const getMaterials = async () => {
  const data = await apiRequest('/materials');
  return Array.isArray(data) ? data : [];
};

export const getMaterialById = async (id) => {
  return apiRequest(`/materials/${id}`);
};
