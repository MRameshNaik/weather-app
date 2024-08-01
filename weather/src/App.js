import React, { useState } from 'react';
import axios from 'axios';
// import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const apiKey = process.env.REACT_APP_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      }).catch((error) => {
        console.error("There was an error fetching the weather data!", error);
      });
      setLocation('');
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name || 'Not Available'}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : <h1>Not Available</h1>}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : <p>Not Available</p>}
          </div>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : <p className='bold'>Not Available</p>}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : <p className='bold'>Not Available</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : <p className='bold'>Not Available</p>}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
