const clientId = "6f4b343b4ad24699933aa2adee2c2fe1";
const clientSecret = "fd117667140a47c78d5015da263f17d9";

const getAccessToken = async () => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
};

export const searchTracks = async (query) => {
  const token = await getAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=5`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();
  return data.tracks.items; // array of track objects
};
