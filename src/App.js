import React, {useState, useEffect} from 'react'
import './App.css';
import AddMovie from './components/addMovies.js'
import ShowMovies from './components/showMovies.js'
import Login from './components/login.js'
import Register from './components/register.js'


function App() {

  const [currentUser, setCurrentUser] = useState({})


  return (
    <>
    <Register setCurrentUser={setCurrentUser}/>
    <Login setCurrentUser={setCurrentUser}/>
    <div>
      <h4>Logged in as: {currentUser.username}</h4>
    </div>
    <div>
      <h1 className="text-center mt-5">Movie Lister</h1>
    </div>
    <AddMovie />
    <ShowMovies />

    </>
  );
}

export default App;
