import React, { useState } from 'react'
const base = "https://api.openweathermap.org/data/2.5/"

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_SECRET_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  let date = String(new window.Date())
  date = date.slice(3,15)

  return (
    <div className = {(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app cold') : 'app'}>
      <main>
        <div className = "search-box">
          <input 
          type = "text"
          className = "search-bar"
          placeHolder = "Search..."
          onChange = {e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className = "location-box">
            <div className = "location">{weather.name}, {weather.sys.country}</div>
            <div className = "date">{date}</div>
          </div>
          <div className = "weather-box">
            <div className = "temp"> {Math.round(weather.main.temp)}°C </div>
            <div className = "weather"> {weather.weather[0].main} </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
