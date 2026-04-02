import React, { useEffect, useState } from "react";

const Player = ({ track }) => {
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (!track) return;
    const fetchLyrics = async () => {
      try {
        const res = await fetch(
          `https://api.lyrics.ovh/v1/${track.artists[0].name}/${track.name}`
        );
        const data = await res.json();
        setLyrics(data.lyrics || "Lyrics not found.");
      } catch (err) {
        setLyrics("Lyrics not found.");
      }
    };
    fetchLyrics();
  }, [track]);

  return (
    <div className="p-4 mt-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">Now Playing</h3>
      <h5 className="font-semibold">
        {track.name} – {track.artists[0].name}
      </h5>
      <audio controls src={track.preview_url} className="w-full my-3"></audio>
      <div className="bg-white p-3 rounded h-40 overflow-y-auto text-sm">
        <pre className="whitespace-pre-wrap">{lyrics}</pre>
      </div>
    </div>
  );
};

export default Player;
