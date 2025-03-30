import { useState } from 'react';
import { fetchGitHubUser } from '../services/githubApi';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const data = await fetchGitHubUser(username);
      setUserData(data);
    } catch (err) {
      setError('User not found or error fetching data.');
      setUserData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">GitHub User Search</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="p-2 border rounded w-64"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {userData && (
        <div className="bg-white p-6 rounded shadow-md text-center w-full max-w-md">
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{userData.name || userData.login}</h2>
          <p className="text-gray-600">{userData.bio || 'No bio available.'}</p>
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mt-2 inline-block"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default HomePage;