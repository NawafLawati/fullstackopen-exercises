import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled: xdd");
      setPersons(response.data);
    });
  }, []);

  const Filter = () => {
    return (
      <>
        <h2>Phonebook</h2>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </>
    );
  };

  const PersonForm = () => {
    return (
      <>
        <h2>Add a new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number:{" "}
            <input
              value={newNumber}
              onChange={handleNumberChange}
              type="number"
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    );
  };

  const Persons = () => {
    return (
      <>
        <h2>Numbers</h2>
        <div>
          {persons.map((person) => (
            <div key={person.id}>
              {person.name} {person.number} <button onClick={() =>handleDelete(person.id)}>delete</button>
              <br />
            </div>
          ))}
        </div>
      </>
    );
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);

    setPersons(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
      })
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
  
    const existingPerson = persons.find(p => p.name === newName);
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      
      if (confirmUpdate) {
        personService
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updatedPerson));
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.error("Error updating person:", error);
            alert("There was an error updating the person. Please try again.");
          });
      }
    } else if (persons.some(p => p.number === newNumber)) {
      alert(`The number ${newNumber} is already taken`);
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          console.error("Error adding person:", error);
          alert("There was an error adding the person. Please try again.");
        });
    }
  };
  

  const handleDelete = (id) =>{

    const person = persons.find(n => n.id === id)
    console.log(person, id);
    personService
    .deleting(id)
    .then(() =>{
      const updatedPersons = persons.filter(p => p.id !== id);
      setPersons(updatedPersons);
    })
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <>
      <Filter />
      <PersonForm />
      <Persons />
    </>
  );
};

export default App;
