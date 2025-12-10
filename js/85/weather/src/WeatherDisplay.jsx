import './WeatherDisplay.css';

export default function WeatherData(props) {
    const temp = props.weather.main.temp;
    const description = props.weather.weather[0].description;
    const name = props.weather.name;
    const realFeel = props.weather.main.feels_like;
    const iconUrl = `https://openweathermap.org/img/w/${props.weather.weather[0].icon}.png`;


    return (
        <>
            <div className='weather-container'>
                <h2> Weather for: {name}</h2>
                <div>Temp is: {temp}</div>
                <div>Real feel: {realFeel}</div>
                <div>Conditions: {description}</div>
                <img src={iconUrl} alt="" />
            </div>

        </>
    )
}
