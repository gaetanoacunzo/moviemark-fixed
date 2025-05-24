import { useState } from 'react';

export default function Home() {
  const [title, setTitle] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, timestamp }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4">🎬 Moviemark</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Titolo del film"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          type="text"
          placeholder="Minutaggio (es. 30:58)"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded"
        >
          {loading ? 'Generazione in corso...' : 'Genera Riassunto'}
        </button>
      </form>
      {summary && (
        <div className="mt-6 p-4 bg-gray-800 rounded shadow max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Riassunto:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
