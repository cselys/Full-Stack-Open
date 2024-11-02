import { useState } from "react";
import { Filter } from "./components/Filter";
import { ListCountries } from "./components/Countries";
import countryService from "./services/country";

const App = () => {
  const [countries, setCountries] = useState([]);

  const [newFilter, setNewFilter] = useState("");
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const allInfo = countryService.getAll()
			.then((response) => {
				
				setCountries(response.data);
				})		

  const handleFilterChange = (event) => {
    const newVal = event.target.value;
    setNewFilter(newVal);
	
    if (newVal == "") 
		setCountriesFiltered([]);
    else {
      const filterNames = countries.filter((country) =>
        country.name.common.toLowerCase().includes(newVal.toLowerCase())
      );
      setCountriesFiltered(filterNames);
    }
  };
  
  return (
    <div>
      <h2>Countries</h2>
	  <Filter newFilter={newFilter} onChange={handleFilterChange} />
	  <ListCountries filtered={countriesFiltered} /> 
    </div>
  );
};

export default App;
