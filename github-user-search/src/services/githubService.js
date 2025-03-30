import axios from 'axios';

export const fetchAdvancedSearch = async ({ username, location, minRepos, page = 1 }) => {

  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  try {
    const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query.trim())}`, {
      params: {
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
  } catch (error) {
    throw new Error('GitHub API Error');
  }
};
