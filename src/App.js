import {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [error,setError] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9b6d0ad00ac40a39e7beaa604410f1bf&units=metric`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url)
      .then((response) => {
        setData(response.data)
        setError('')
        // console.log(response)
  
      })
      .catch( (error) => {
        console.log(error.request.statusText)
        setError('Location ' + error.request.statusText)
      })
    }
  }

  
  return (
    <div className="App">      
      <div className='search'>
        <input
          value={location}
          onChange={event=> setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'

        />
        { error ? <p className='error'>{error}</p> : ''}
      </div>
      {  data.main&& !error ? 
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h2>{ (data.main.temp).toFixed(0)}°C</h2>
              <div className="description">
              <p>{data.weather[0].main}</p> 
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className='feels'>
              <p>{ (data.main.feels_like).toFixed(0)}°C</p>
              <label>Feels like</label>
            </div>
            <div className='humidity'>
              <p>{data.main.humidity}%</p>
              <label>Humidity</label>
            </div>
            <div className='wind'>
              <p>{ (data.wind.speed).toFixed(0)}km</p>
              <label>Wind</label>
            </div>
          </div>
        </div>
        : ''}
    </div>
  );

}

export default App;
