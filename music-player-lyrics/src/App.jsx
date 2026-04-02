import React, { useState } from "react";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Lyrics from "./components/Lyrics";

function App() {
  const [playlists, setPlaylists] = useState([{ name: "My Playlist", tracks: [] }]);
  const [currentTrack, setCurrentTrack] = useState(null);

  return (
    <div>
      <h1 className="mb-4">🎶 Music Player with Lyrics</h1>
      <Playlist
        playlists={playlists}
        setPlaylists={setPlaylists}
        setCurrentTrack={setCurrentTrack}
      />
      {currentTrack && <Player track={currentTrack} />}
      {currentTrack && <Lyrics track={currentTrack} />}
    </div>
  );
}

export default App;
