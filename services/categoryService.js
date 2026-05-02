import { apiRequest } from './api';

export async function getCategories() {
  return apiRequest('/categories');
}

export async function getCategoryById(id) {
  return apiRequest(`/categories/${id}`);
}
