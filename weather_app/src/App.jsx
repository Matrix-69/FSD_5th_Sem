import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [weatherData, setWeatherData] = useState(null);


  const changeCity = (e) => {
    setCity(e.target.value);
    setMessage('');
  };


  const showWeather = (e) => {
    e.preventDefault();
    if (city === '') {
      setMessage('Please enter a city name');
      return;
    }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=xxxxxxxxxxxxxxxx`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setWeatherData(data);
        setMessage('');
        setCity('');
      })
      .catch(error => {
        console.error(error);
        setMessage('City not found');
        setWeatherData(null);
      });
  };


  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="card text-center p-4">
        <div className="card-body">
          <h1 className="card-title mb-4">Weather App</h1>
          <form className='d-flex flex-column align-items-center' onSubmit={showWeather}>
            <input
              type="text"
              placeholder="Enter city name"
              className="form-control mb-3"
              value={city}
              onChange={changeCity}
            />
            <button type="submit" className="btn btn-primary">
              Get Weather
            </button>
          </form>
          {message && <div className="mt-3 text-danger">{message}</div>}
          {weatherData && (
            <div className="mt-4">
              <h4>{weatherData.name}, {weatherData.sys.country}</h4>
              <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
              <p>Condition: {weatherData.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default App;


