import React, { Component } from 'react';

import WeatherDisplay from './WeatherDisplay'


class WeatherContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            isLoading: true
        }
    }

    async componentDidMount() {
        try {
            const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=08701&appid=9f4c2f48accc368b5b06c032f22099ef&units=imperial&lang=en`);
            const weatherData = await r.json();
            if (!r.ok) {
                throw new Error(`${r.status} - ${r.statusText} - ${weatherData.message}`);
            }
            console.log(weatherData);
            this.setState({ weatherData });

        }
        catch {
            console.log('error');
        }
    }

    render() {
        if (!this.state.weatherData) {
            return (<div>Loading...</div>)
        }

        return (
            <WeatherDisplay weather={this.state.weatherData} />
        );
    }

}
export default WeatherContainer