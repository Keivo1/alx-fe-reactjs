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
      const { users, hasMorePages } = await fetchAdvancedSearch({ username, location, minRepos, page: 1 });
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
      const { users, hasMorePages } = await fetchAdvancedSearch({ username, location, minRepos, page: nextPage });
      setResults((prev) => [...prev, ...users]);
      setHasMore(hasMorePages);
    } catch {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub Advanced User Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username (optional)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location (e.g. Nigeria)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && !loading && <p className="mt-4 text-red-500">{error}</p>}

     
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div key={user.id} className="flex items-center gap-4 p-4 border rounded shadow-sm">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{user.login}</h2>
              <a href={user.html_url} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
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
