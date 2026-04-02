import React, { useState } from "react";
import { searchTracks } from "../api/spotify";

const Playlist = ({ playlists, setPlaylists, setCurrentTrack }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const tracks = await searchTracks(query);
    setResults(tracks);
  };

  const addToPlaylist = (track, playlistName) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.name === playlistName
          ? { ...pl, tracks: [...pl.tracks, track] }
          : pl
      )
    );
  };

  const removeFromPlaylist = (trackId, playlistName) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.name === playlistName
          ? { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) }
          : pl
      )
    );
  };

  return (
    <div className="p-4">
      {/* 🔎 Search Section */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search songs..."
          className="flex-1 border px-3 py-2 rounded-md"
        />
        <button
          className="bg-[#1DB954] hover:bg-green-600 text-white font-bold px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {/* 🎶 Search Results */}
      {results.length > 0 && (
        <>
          <h3 className="text-lg font-bold mb-3">Search Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((track) => (
              <div
                key={track.id}
                className="bg-gray-900 text-white rounded-lg p-3 shadow-lg hover:shadow-xl transition flex flex-col"
              >
                <img
                  src={track.album.images[0]?.url}
                  alt="album"
                  className="w-full h-40 object-cover rounded"
                />
                <h5 className="mt-2 font-semibold text-sm truncate">
                  {track.name}
                </h5>
                <p className="text-xs text-gray-300">
                  {track.artists[0].name}
                </p>
                <div className="flex justify-between mt-3 gap-2">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                    onClick={() => setCurrentTrack(track)}
                  >
                    ▶ Play
                  </button>
                  <button
                    className="flex-1 bg-black hover:bg-gray-800 text-white text-xs px-2 py-1 rounded"
                    onClick={() => addToPlaylist(track, playlists[0].name)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 📂 Playlist Library */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-3">My Playlist</h3>
        {playlists[0].tracks.length === 0 ? (
          <p className="text-gray-500">No songs added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playlists[0].tracks.map((track) => (
              <div
                key={track.id}
                className="bg-gray-800 text-white rounded-lg p-3 shadow-md flex flex-col"
              >
                <img
                  src={track.album.images[0]?.url}
                  alt="album"
                  className="w-full h-40 object-cover rounded"
                />
                <h5 className="mt-2 font-semibold text-sm truncate">
                  {track.name}
                </h5>
                <p className="text-xs text-gray-300">
                  {track.artists[0].name}
                </p>
                <div className="flex justify-between mt-3 gap-2">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                    onClick={() => setCurrentTrack(track)}
                  >
                    ▶ Play
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                    onClick={() =>
                      removeFromPlaylist(track.id, playlists[0].name)
                    }
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
