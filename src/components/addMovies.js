import React, {useState} from 'react'

const AddMovie = (props) => {

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [rank, setRank] = useState('');
  const [comments, setComments] = useState('');
  const [imgurl, setImgurl] = useState('');
  const email = props.currentUser.email

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }

  const handleChangeDirector = (e) => {
    setDirector(e.target.value)
  }

  const handleChangeGenre = (e) => {
    setGenre(e.target.value)
  }

  const handleChangeRating = (e) => {
    setRating(e.target.value)
  }

  const handleChangeRank = (e) => {
    setRank(e.target.value)
  }

  const handleChangeComments = (e) => {
    setComments(e.target.value)
  }

  const handleChangeImgURL = (e) => {
    setImgurl(e.target.value)
  }


  const handleNewMovie = async (e) => {
    e.preventDefault()
    try {
      const body = { title, year, director, genre, rating, rank, comments, imgurl, email }
      const response = await fetch("https://obscure-caverns-74597.herokuapp.com/movies", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      })
      props.getMovies()
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
    <div className="addButtn">
      <button type="button" className="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#addModal">Add Movie</button>
      </div>
      <div className="modal" id="addModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Movie</h4>
            </div>

            <div className="modal-body">
              <form className="form form-control" onSubmit={handleNewMovie}>
                <input name="title" className="form-control" onChange={handleChangeTitle} type="text" placeholder="Movie Title"/> <br/>
                <input name="year" className="form-control" onChange={handleChangeYear} type="number" placeholder="Year Released"/> <br/>
                <input name="director" className="form-control" onChange={handleChangeDirector} type="text" placeholder="Director"/> <br/>
                <input name="genre" className="form-control" onChange={handleChangeGenre} type="text" placeholder="Genre"/> <br/>
                <input name="rating" className="form-control" onChange={handleChangeRating} type="number" min="1" max="5" placeholder="Rating (1-5)"/> <br/>
                <input name="rank" className="form-control" onChange={handleChangeRank} type="number" min="1" max="10" placeholder="Ranking"/> <br/>
                <input name="comments" className="form-control" onChange={handleChangeComments} type="text" placeholder="Comments"/> <br/>
                <input name="imgurl" className="form-control" onChange={handleChangeImgURL} type="text" placeholder="Image URL"/> <br/>
                <button className="btn btn-secondary mt-2" type="submit" data-bs-dismiss="modal">Add Movie</button>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMovie
