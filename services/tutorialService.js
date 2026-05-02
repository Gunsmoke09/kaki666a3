import { apiRequest } from './api';

export async function getTutorials() {
  return apiRequest('/tutorials');
}

export async function getTutorialById(id) {
  return apiRequest(`/tutorials/${id}`);
}
