import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};
