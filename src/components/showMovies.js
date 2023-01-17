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
      {movies.map((movie) => {
        return (
          <div className="movies">
            <div className="card" key={movie.id}>
              <img src={movie.imgurl} className="card-img-top" width="200" height="375"/>
              <div className="card-body">
                <h4 className="text-center">{movie.title} ({movie.year})</h4>
                <h4 className="text-center">{movie.rank}</h4>
                <EditMovie movie={movie} />
                <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
              </div>
            </div>
          </div>
        )
      })}

    </>
  )
}

export default ShowMovies;
