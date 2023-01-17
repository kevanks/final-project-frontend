import React, {useState} from 'react'

const EditMovie = (props) => {

  const [title, setTitle] = useState(props.movie.title)
  const [year, setYear] = useState(props.movie.year)
  const [director, setDirector] = useState(props.movie.director)
  const [genre, setGenre] = useState(props.movie.genre)
  const [rating, setRating] = useState(props.movie.rating)
  const [rank, setRank] = useState(props.movie.rank)
  const [comments, setComments] = useState(props.movie.comments)
  const [imgurl, setImgurl] = useState(props.movie.imgurl)


  const updateMovie = async (e) => {
    e.preventDefault()
    try {
      const body = { title, year, director, genre, rating, rank, comments, imgurl }
      const response = await fetch(`https://obscure-caverns-74597.herokuapp.com/movies/${props.movie.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      })
      window.location = "/";
      props.getMovies()
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${props.movie.id}`}>Edit</button>

      <div className="modal" id={`id${props.movie.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Movie</h4>
            </div>

            <div className="modal-body">
              <form>
                <label htmlFor="title">Title</label>
                <input name="title" type="text" className="form-control" defaultValue={props.movie.title} onChange={e => setTitle(e.target.value)}/> <br/>
                <label htmlFor="year">Year Released</label>
                <input name="year" type="number" className="form-control" defaultValue={props.movie.year} onChange={e => setYear(e.target.value)}/> <br/>
                <label htmlFor="director">Director</label>
                <input name="director" type="text" className="form-control" defaultValue={props.movie.director} onChange={e => setDirector(e.target.value)}/> <br/>
                <label htmlFor="genre">Genre(s)</label>
                <input name="genre" type="text" className="form-control" defaultValue={props.movie.genre} onChange={e => setGenre(e.target.value)}/> <br/>
                <label htmlFor="rating">Rating(1-5)</label>
                <input name="rating" type="number" className="form-control" defaultValue={props.movie.rating} onChange={e => setRating(e.target.value)}/> <br/>
                <label htmlFor="rank">Ranking</label>
                <input name="rank" type="number" className="form-control" defaultValue={props.movie.rank} onChange={e => setRank(e.target.value)}/> <br/>
                <label htmlFor="comments">Comments</label>
                <input name="comments" type="textbox" className="form-control" defaultValue={props.movie.comments} onChange={e => setComments(e.target.value)}/> <br/>
                <label htmlFor="imgurl">Movie Poster Image URL</label>
                <input name="imgurl" type="text" className="form-control" defaultValue={props.movie.imgurl} onChange={e => setImgurl(e.target.value)}/> <br/>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={e => updateMovie(e)}>Edit</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditMovie
