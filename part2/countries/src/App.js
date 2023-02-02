import { useState, useEffect } from 'react';
import axios from 'axios';

import Countries from './components/Countries';

const App = () => {
    const [countryQuery, setCountryQuery] = useState('');
    const [countries, setCountries] = useState([]);
    const countriesUrl = "https://restcountries.com/v3.1/all";

    useEffect(() => {
        axios
            .get(countriesUrl)
            .then(response => setCountries(response.data));
    }, []);
    
    const handleCountryQuery = (event) => setCountryQuery(event.target.value);

    return (
	<div>
          <p>Query by name: <input value={countryQuery} onChange={handleCountryQuery}/></p>
         <Countries query={countryQuery} countries={countries}/>
        </div>
    );
};

export default App;
