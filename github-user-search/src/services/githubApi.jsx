const GITHUB_API = 'https://api.github.com';

export const fetchGitHubUser = async (username) => {
  const response = await fetch(`${GITHUB_API}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('User not found');
  }

  return response.json();
};
