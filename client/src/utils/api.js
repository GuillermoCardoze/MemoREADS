const API_BASE_URL = 'http://localhost:5555';

export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return response.json();
};
