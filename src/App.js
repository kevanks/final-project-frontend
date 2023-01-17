import React from 'react'
import './App.css';
import AddMovie from './components/addMovies.js'
import ShowMovies from './components/showMovies.js'


function App() {
  return (<>
    <div>
      <h1 className="text-center mt-5">Movie Lister</h1>
    </div>
    <AddMovie />
    <ShowMovies />

    </>
  );
}

export default App;
