import React, {useState, useEffect} from 'react'
import EditMovie from './editMovies.js'
import '../App.css';



const ShowMovies = () => {

  const [movies, setMovies] = useState([])


  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/movies")
      const jsonData = await response.json()
      setMovies(jsonData)
    } catch (err) {
      console.log(err.message);
    }
  }

  // delete function
  const handleDelete = async (id) => {
    try {
      const deleteMovie = await fetch(`http://localhost:5000/movies/${id}`, {
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

  return (
    <>
      <h1 className="text-center mt-5">TOP 10 MOVIES</h1>
      <div className="container">
      {movies.map((movie) => {
        return (
            <div className="card" key={movie.id}>
              <img src={movie.imgurl} className="card-img-top" width="200" height="375"/>
              <div className="card-body">
                <h4 className="text-center">{movie.title} ({movie.year})</h4>
                <h4 className="text-center">{movie.rank}</h4>
                <button className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#show${movie.id}`}>Show More</button>
                <EditMovie movie={movie} getMovies={getMovies}/>
                <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            <div class="modal" id={`show${movie.id}`}>
            <div class="modal-dialog">
            <div class="modal-content">

            <div class="modal-header text-center">
              <h4 class="text-center">{movie.title} ({movie.year})</h4>
            </div>
            <div class="modal-body">
              <img src={movie.imgurl} className="center" width="465" height="640"/>
              <h5 className="text-center mt-3">Director: {movie.director}</h5>
              <h5 className="text-center mt-2">Genre: {movie.genre}</h5>
              <h5 className="text-center mt-2">Rating: {movie.rating}</h5>
              <h5 className="text-center mt-2">Ranking: {movie.rank}</h5>
              <h5 className="text-center mt-2">Comments: </h5>
              <p className="text-center">{movie.comments}</p>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

            </div>
            </div>
          </div>
        </div>
        )
      })}
      </div>
    </>
  )
}

export default ShowMovies;
