import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <input type="text" placeholder="Search by first name" onChange={handleChange} />
      {filteredUsers.map(user => (
        <div key={user.id}>
          <img src={user.avatar} alt={user.first_name} />
          <p>{user.first_name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
