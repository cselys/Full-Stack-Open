import weatherService from "../services/weather";
import { useState,useEffect } from "react";

const iconUrl='https://openweathermap.org/img/wn/'

export const DisplayCountry = 	({ filtered, country }) => {	
		const [selectedWeather, setSelectedWeather] = useState(null);
		const size = Object.keys(filtered).length;
		useEffect(() => {
			const weather = weatherService.getWeather(country.capital+","+country.cca2)
			.then((response) => {
				setSelectedWeather(response.data);
			})
		}, []);
		
		if(size<1 || size>10 || filtered===null)
			return <></>
		
		return (
			<div>
				<h2>{country.name.common}</h2>
				<p>capital {country.capital}</p>
				<p>area {country.area}</p>
				<h3>languages </h3>
				<ul>
					{Object.entries(country.languages).map(([code,lan]) => (<li key={code}>{lan} </li>) ) }
				</ul>
				<img src={country.flags['png']} alt={country.flags['alt']}/>	
				<h3>Weather in {country.capital}</h3>	
				{selectedWeather &&
					(<>
					 <p>temperature {selectedWeather.main['temp']} Fahrenheit</p>
					 <img src={iconUrl+selectedWeather.weather[0].icon+'.png'} alt={selectedWeather.weather[0].description}/>	
					 <p>wind {selectedWeather.wind['speed']} mph</p>
					 </>
					)
				
				}
		    </div>
		)
}

