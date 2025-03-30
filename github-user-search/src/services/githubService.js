import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export const fetchAdvancedSearch = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;

  try {
    const response = await axios.get(`${GITHUB_API}/search/users`, {
      params: { q: query.trim() },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      },
    });

    return response.data.items; 
  } catch (error) {
    throw new Error('Search failed');
  }
};
