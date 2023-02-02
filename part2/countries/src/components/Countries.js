import { useState, useEffect } from 'react';
import axios from 'axios';
import process from 'process';

const CountryInDepth = ({country}) => {
    const api_key = process.env.OPEN_WEATHER_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${country.capital}&units=metric&appid=${api_key}`;

    const [weather, setWeather] = useState(null);

    useEffect(() => {
	axios
	    .get(weatherUrl)
	    .then(response => setWeather(response.data))
	    .catch(error => {
		if (!api_key) console.log("API key for OpenWeather is missing. Use 'OPEN_WEATHER_KEY' env variable to set it.");
	    });
    }, []);

    if (!weather) {
	return (
	    <div>
	      <h2>{country.name.common} {country.flag}</h2>
	      <table>
		<tbody>
		  <tr><td>Capital: </td><td>{country.capital}</td></tr>
		  <tr><td>Region: </td><td>{country.region}</td></tr>
		  <tr><td>Area: </td><td>{country.area}</td></tr>
		</tbody>
	      </table>
	      <h3>Languages:</h3>
	      <ul>
		{Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
	      </ul>
	    </div>
	);
    } else {
	const temp = weather.list[0].main.temp;
	const icon = weather.list[0].weather[0].icon;
	const wind = weather.list[0].wind.speed;
	return (
	    <div>
	      <h2>{country.name.common} {country.flag}</h2>
	      <table>
		<tbody>
		  <tr><td>Capital: </td><td>{country.capital}</td></tr>
		  <tr><td>Region: </td><td>{country.region}</td></tr>
		  <tr><td>Area: </td><td>{country.area}</td></tr>
		</tbody>
	      </table>
	      <h3>Languages:</h3>
	      <ul>
		{Object.values(country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
	      </ul>
	      <h3>Weather in {country.capital}</h3>
	      <div>Temperature: {temp} Celsius</div>
	      <div>Speed: {wind} m/s</div>
	      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
	    </div>
	);
    }
};


const Country = ({country}) => {
    const name = country.name.common;
    const [toggle, setToggle] = useState(false);

    const toggleCountry = () => {
	setToggle(!toggle);
    };

    if (toggle) {
	return (<>
		  <div>{name} <button onClick={toggleCountry}>Hide</button></div>
		  <CountryInDepth country={country}/>
		</>);
    } else {
	return (<div>{name} <button onClick={toggleCountry}>Show</button></div>);
    }
};


const Countries = ({query, countries}) => {

    if (query && countries !== [] && countries[0] !== undefined) {

	const filteredCountries = countries.filter(country =>
	    country.name.common.toLowerCase().includes(query.toLowerCase()));

	if (filteredCountries.length > 10)
	    return (<div>Too many countries match the query.</div>);

	if (filteredCountries.length === 1)
	    return (<CountryInDepth country={filteredCountries[0]}/>);

	// Else return all matching countries
	return (
	    <div>
	      {filteredCountries
	       .map((country, i) => (<Country key={i} country={country}/>))}
	    </div>
	);
    }
};

export default Countries;
