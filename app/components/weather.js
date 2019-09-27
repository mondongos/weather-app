import React from 'react'

export default class Weather extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCity: "London"
        }

        this.updateCity = this.updateCity.bind(this)
    }

    updateCity (selectedCity) {
        this.setState({
            selectedCity
        })
    }

    render() {
        const cities = ["London", "Boston", "Glasgow", "New York", "Aberdeen", "Philadelphia", "Chicago"]
        return(
            <ul className="flex-center">
                {cities.map((city) => (
                    <li key={city}>
                        <button 
                        className="btn-clear nav-link" 
                        style={city === this.state.selectedCity ? {color: "purple"} : null}
                        onClick={() => this.updateCity(city)}>
                        {city}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}