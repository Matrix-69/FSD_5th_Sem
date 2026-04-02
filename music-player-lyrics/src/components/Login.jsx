const Login = () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const scopes = import.meta.env.VITE_SCOPES;

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}&response_type=token&show_dialog=true`;

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <a className="btn btn-success btn-lg" href={authUrl}>
        Login with Spotify
      </a>
    </div>
  );
};

export default Login;
