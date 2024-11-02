import { useState } from "react";
import contactService from "../services/contacts";

export const PersonForm = ({ persons,updatePersons, updateFiltered, setNotification}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (persons.filter((person) => person.name === newName).length == 0) {
      const newPerson = { name: newName, number: newNumber };
      contactService.create(newPerson).then((returnedPerson) => {
        updatePersons([...persons, returnedPerson.data]);
		setNotification(`Added ${newName}`);
        resetForm();
      });
    } else {
		if(window.confirm(`${newName} is already added to phonebook, replace the number with a new one?`)){
			const person = persons.find(n => n.name === newName)
			const updatePerson = {...person, number: newNumber };
			contactService.update(person.id, updatePerson)
			.then((returnedPerson) => {				
				const newp = persons.map(p => p.id === person.id ? { ...p, number: newNumber } : p)
				updatePersons(newp)
				setNotification(`Updated ${person.name}`);
				resetForm();
			})
			.catch(error => {
				setNotification(`Information of ${person.name} has already been removed from server.`);
			 })
		}			
	}
  };
  
  const resetForm = () => {
	  setNewName("");
	  setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
