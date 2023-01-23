import React, {useState, useEffect} from 'react'
import EditMovie from './editMovies.js'
import '../App.css';


const ShowMovies = (props) => {

  const [movies, setMovies] = useState([])



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
    props.getMovies()
  }, [])

  return (
    <>
      <div className="container mt-5">
      {movies.map((movie) => {
        return (
            <div className="card" key={movie.id}>
              <img src={movie.imgurl} className="card-img-top" width="200" height="375" data-bs-toggle="modal" data-bs-target={`#show${movie.id}`}/>
              <div className="card-body">
                <h4 className="text-center">{movie.title} ({movie.year})</h4>
                <h4 className="text-center">{movie.rank}</h4>
                <div className="buttons">
                  <EditMovie movie={movie} />
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
    </>
  )
}

export default ShowMovies;
