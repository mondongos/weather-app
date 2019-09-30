import React from 'react'
import PropTypes from 'prop-types'
import { fetchWeather } from '../utils/weatherAPI'
import { FaUser } from 'react-icons'

function CitiesNav ({selected, onUpdateCity}) {
    const cities = ["London", "Boston", "Philadelphia", "Glasgow", "Aberdeen", "Chicago"]
    return (
        <ul className="flex-center">
            {cities.map((city) => (
                <li key={city}>
                    <button 
                    className="btn-clear nav-link" 
                    style={city === selected ? {color: "purple"} : null}
                    onClick={() => onUpdateCity(city)}>
                    {city}
                    </button>
                </li>
            ))}
        </ul>
    )
}


CitiesNav.propTypes = {
    selected: PropTypes.string.isRequired, 
    onUpdateCity: PropTypes.func.isRequired
}

function WeatherCards ({cityWeather}) {
    return (
        <div className="city-container">
             <div className="weather-type">
                 <img
                 src={"http://openweathermap.org/img/w/" + cityWeather.weather[0].icon + ".png" }
                 />
            </div>
            <div className="weather-type">
                {cityWeather.weather[0].main}
            </div>
            <div className="weather-type">
                {(cityWeather.weather[0].description)}
            </div>
            <div className="weather-type">
                {Math.round(parseInt(cityWeather.main.temp) - 273.15) + "℃"} 
            </div>
        </div>
    )
}

WeatherCards.propTypes = {
    cityWeather: PropTypes.object.isRequired
}

export default class Weather extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCity: "London", 
            cityWeatherAPI: null, 
            error: null
        }

        this.updateCity = this.updateCity.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    updateCity(selectedCity) {
        this.setState({
            selectedCity, 
            error: null, 
            cityWeatherAPI: null
        })

        fetchWeather(selectedCity) 
        .then((cityWeatherAPI) => this.setState({
            cityWeatherAPI, 
            error: null,
        }))
        .catch(() => {
            console.warn("Error fetching API: ")
            this.setState({
                error: "There was an error fetching the weather API"
            })
        })
    }

    isLoading() {
        return this.state.cityWeatherAPI === null && this.state.error === null
    }

    render() {
        const { selectedCity, cityWeatherAPI, error } = this.state
        return (
            <React.Fragment>
                <CitiesNav
                selected = { selectedCity }
                onUpdateCity = {this.updateCity}/>
                {this.isLoading() && <p>LOADING</p>}
                {error && <p>{error}</p>}
                {cityWeatherAPI && <WeatherCards cityWeather={cityWeatherAPI} />}
            </React.Fragment>
        )
    }
}