import { useState, useEffect } from "react";
import { ListPersons } from "./components/ListPersons";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Notification } from "./components/Notification";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  /*[
   { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]*/

  const [newFilter, setNewFilter] = useState("");
  const [personsFiltered, setPersonsFiltered] = useState(persons);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contactService.getAll().then((response) => {
      setPersonsFiltered(response.data);
      setPersons(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const newVal = event.target.value;
    setNewFilter(newVal);

    const copyPersons = Array.from(persons);
    if (newVal == "") setPersonsFiltered(persons);
    else {
      const filterNames = copyPersons.filter((person) =>
        person.name.toLowerCase().includes(newVal.toLowerCase())
      );
      setPersonsFiltered(filterNames);
    }
  };

  const updatePersons = (newpersons) => {
    setPersons(newpersons);
    setPersonsFiltered(newpersons);
    setNewFilter("");
	showNotification(message)
  };
  
  const setNotification = (msg)=> setMessage(msg);
  
  const handleFilterUpdate = (newData) => {
		setPersonsFiltered(newData);
	};
	
  const showNotification = (msg) => {
	  setMessage(msg);
	  setTimeout( () => {setMessage(null)}, 3000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification message={message}/>
	  
      <Filter newFilter={newFilter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm persons={persons} updatePersons={updatePersons} updateFiltered={handleFilterUpdate} setNotification={setNotification}/>

      <h2>Numbers</h2>
      <ListPersons filtered={personsFiltered} updateFiltered={handleFilterUpdate}/>
    </div>
  );
};

export default App;
