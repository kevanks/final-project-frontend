import React, {useState, useEffect} from 'react'
import './App.css';
import AddMovie from './components/addMovies.js'
import ShowMovies from './components/showMovies.js'
import Login from './components/login.js'
import Register from './components/register.js'
import EditMovie from './components/editMovies.js'


function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [movies, setMovies] = useState([])
  const [allMovies, setAllMovies] = useState([])
  const [homePage, setHomePage] = useState(true)
  const [registerButtn, setRegisterButtn] = useState(false)
  const [loginButtn, setLoginButtn] = useState(false)


  const getAllMovies = async () => {
    try {
      const response = await fetch("https://obscure-caverns-74597.herokuapp.com/movies")
      const jsonData = await response.json()
      setAllMovies(jsonData)
      console.log(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  }


  const getMovies = async () => {
    try {
      console.log(currentUser);
      console.log(currentUser.email);
      console.log(`https://obscure-caverns-74597.herokuapp.com/movies/user/${currentUser.email}`);
      const response = await fetch(`https://obscure-caverns-74597.herokuapp.com/movies/user/${currentUser.email}`)
      const jsonData = await response.json()
      console.log(response);
      setMovies(jsonData)
      console.log(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleDelete = async (id) => {
    try {
      const deleteMovie = await fetch(`https://obscure-caverns-74597.herokuapp.com/movies/${id}`, {
        method: "DELETE"
      })
      setMovies(movies.filter(movie => movie.id !== id))
    } catch (err) {
      console.log(err.message);
    }
  }


  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    getAllMovies()
  }, [])


  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    }
  }, []);


  return (
    <>
    <div className="logButtns">
      {(registerButtn) ? null :
      <Register setCurrentUser={setCurrentUser} currentUser={currentUser} setHomePage={setHomePage} setLoginButtn={setLoginButtn} /> }
      {(loginButtn) ? null :
      <Login setCurrentUser={setCurrentUser} currentUser={currentUser} setHomePage={setHomePage} setRegisterButtn={setRegisterButtn} getMovies={getMovies} /> }
    </div>
    {(homePage) ?
    <div className="home">
    <div className="text-center">
      <h1 className="title text-center mt-5">MOVIE BAY</h1>
      <p className="welcomeText mt-5">Welcome to Movie Bay please log in or create an account with us to use our app.</p>
      <p className="welcomeText">On Movie Bay you'll be able to rank all your favorite movies comment on them and see what friends are watching.</p>
      <p className="welcomeText">Below you can see some of the movies our users have watched and enjoyed.</p>
    </div>
    <div className="allMovies mt-5">
    {allMovies.map((movie) => {
      return (
          <div className="card" key={movie.id}>
            <img src={movie.imgurl} className="card-img-top" width="200" height="400" data-bs-toggle="modal" data-bs-target={`#show${movie.id}`}/>
            <div className="card-body">
              <h4 className="text-center">{movie.title} ({movie.year})</h4>
            </div>
          <div className="modal" id={`show${movie.id}`}>
          <div className="modal-dialog">
          <div className="modal-content">

          <div className="modal-header text-center">
            <h4 className="text-center">{movie.title} ({movie.year})</h4>
          </div>
          <div className="modal-body">
            <img src={movie.imgurl} className="center" width="465" height="640"/>
            <h5 className="text-center mt-3">Director: {movie.director}</h5>
            <h5 className="text-center mt-2">Genre: {movie.genre}</h5>
            <h5 className="text-center mt-2">Comment left by a user: </h5>
            <p className="text-center">{movie.comments}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

          </div>
          </div>
        </div>
      </div>
      )
    })}
    </div>
    </div>
    :
    <div>
    <div>
      <h1 className="title text-center mt-5">{currentUser.username} BAY</h1>
    </div>
    <AddMovie currentUser={currentUser} getMovies={getMovies} />
    <div className="container mt-5">
    {movies.map((movie) => {
      return (
          <div className="card" key={movie.id}>
            <img src={movie.imgurl} className="card-img-top" width="200" height="400" data-bs-toggle="modal" data-bs-target={`#show${movie.id}`}/>
            <div className="card-body">
              <h4 className="text-center">{movie.title} ({movie.year})</h4>
              <h4 className="text-center">{movie.rank}</h4>
              <div className="buttons">
                <EditMovie movie={movie} movies={movies} getMovies={getMovies}/>
                <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            </div>
          <div className="modal" id={`show${movie.id}`}>
          <div className="modal-dialog">
          <div className="modal-content">

          <div className="modal-header text-center">
            <h4 className="text-center">{movie.title} ({movie.year})</h4>
          </div>
          <div className="modal-body">
            <img src={movie.imgurl} className="center" width="465" height="640"/>
            <h5 className="text-center mt-3">Director: {movie.director}</h5>
            <h5 className="text-center mt-2">Genre: {movie.genre}</h5>
            <h5 className="text-center mt-2">Rating: {movie.rating}</h5>
            <h5 className="text-center mt-2">Ranking: {movie.rank}</h5>
            <h5 className="text-center mt-2">Comments: </h5>
            <p className="text-center">{movie.comments}</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

          </div>
          </div>
        </div>
      </div>
      )
    })}
    </div>
  </div>
  }

  </>
  );
}

export default App;
