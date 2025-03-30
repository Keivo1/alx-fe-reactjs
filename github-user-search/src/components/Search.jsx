import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUser(null);
    setLoading(true);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {user && (
        <div className="mt-6 p-4 border rounded flex items-center gap-4 shadow-sm">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
