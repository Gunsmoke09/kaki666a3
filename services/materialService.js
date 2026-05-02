import { apiRequest } from './api';

export async function getMaterials() {
  return apiRequest('/materials');
}

export async function getMaterialById(id) {
  return apiRequest(`/materials/${id}`);
}
