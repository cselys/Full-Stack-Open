import contactService from "../services/contacts";
    
export const ListPersons = ({ filtered,persons, updatePersons, updateFiltered }) => {
	
	const deletePerson = (name, id) => {
		if(window.confirm(`Delete ${name}?`)){
			contactService.remove(id)
			.then(() => {
				updateFiltered(filtered.filter((person) => person.id != id))
				updatePersons(persons.filter((person) => person.id != id))
			})
		}
	} 
	return (
		<div >
			{filtered.map((person, index) => (
			<p key={person.id}> {person.name}  {person.number} 
			{person.id.length>1 && (<button onClick={()=>{deletePerson(person.name, person.id)}}>delete</button>)}</p> 
			))}
		</div>
	)
}

