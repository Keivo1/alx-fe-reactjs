import { useState } from 'react';
import { fetchAdvancedSearch } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);
    setPage(1);
    setLoading(true);

    try {
      const { users, hasMorePages } = await fetchAdvancedSearch({
        username,
        location,
        minRepos,
        page: 1,
      });
      setResults(users);
      setHasMore(hasMorePages);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoading(true);

    try {
      const { users, hasMorePages } = await fetchAdvancedSearch({
        username,
        location,
        minRepos,
        page: nextPage,
      });
      setResults((prev) => [...prev, ...users]);
      setHasMore(hasMorePages);
    } catch {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold text-center mb-4">GitHub Advanced User Search</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Location (e.g. Nigeria)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Min Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="px-4 py-2 border rounded w-full"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {results.map((user) => (
          <div key={user.id} className="flex items-center p-4 border rounded shadow-sm gap-4">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="font-semibold text-lg">{user.login}</h2>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
