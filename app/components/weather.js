import React from 'react'

function CitiesNav ({selected, onUpdateCity}) {
    const cities = ["London", "Boston", "Glasgow", "New York", "Aberdeen", "Philadelphia", "Chicago"]
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
        const { selectedCity } = this.state
        return (
            <React.Fragment>
                <CitiesNav
                selected = { selectedCity }
                onUpdateCity = {this.updateCity}>
                </CitiesNav>
            </React.Fragment>
        )
    }
}