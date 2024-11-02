import {DisplayCountry} from "./Country";
import { useState, useEffect } from "react";
    
export const ListCountries = ({ filtered }) => {
	const size = Object.keys(filtered).length
	const [selectedCountry, setSelectedCountry] = useState(null);
	
		
	const showCountry =(country) => {
		setSelectedCountry(country);		
	}
	
	useEffect(() => {
		if(size>10)
			setSelectedCountry(null);
			
		}, [filtered]);
	
	if(size>10){
		return <div>Too many matches, specify another filter</div>
	}
	else if(size == 1)
		return (
			<DisplayCountry filtered={filtered} country={filtered[0]} />
		)
	
	return (
		<div >
			{filtered.map((country, index) => (
			<p key={country.name.common}> {country.name.common} <button onClick={()=>{showCountry(country)}}>show</button></p> 
			))}
			{selectedCountry && (<DisplayCountry filtered={filtered}  country={selectedCountry}/>)}
		</div>
	)
}

