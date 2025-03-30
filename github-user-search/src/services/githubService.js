import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export const fetchAdvancedSearch = async ({ username, location, minRepos, page = 1 }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(`${GITHUB_API}/search/users`, {
    params: {
      q: query.trim(),
      per_page: 10,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    },
  });

  const users = response.data.items;
  const totalCount = response.data.total_count;
  const hasMorePages = page * 10 < totalCount;

  return { users, hasMorePages };
};
