import React, { useState, useEffect } from "react";

const Lyrics = ({ track }) => {
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (!track) return;

    // Example using lyrics.ovh (free lyrics API)
    fetch(`https://api.lyrics.ovh/v1/${track.artists[0].name}/${track.name}`)
      .then((res) => res.json())
      .then((data) => {
        setLyrics(data.lyrics || "Lyrics not found.");
      })
      .catch(() => setLyrics("Lyrics not available."));
  }, [track]);

  if (!track) return null;

  return (
    <div className="lyrics-box">
      <h3>Lyrics: {track.name}</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{lyrics}</pre>
    </div>
  );
};

export default Lyrics;
