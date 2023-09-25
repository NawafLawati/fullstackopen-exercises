import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [newNumber, setNewNumber] = useState(0);

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
              {person.name} {person.number}
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
      id: persons.length + 1,
    };
    if (persons.some((p) => p.name == newName)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((p) => p.number == newNumber)) {
      alert(`The number ${newNumber} is already taken`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber(0);
    }
  };

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
