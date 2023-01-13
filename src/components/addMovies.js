import React, {useState} from 'react'

const AddMovie = () => {

  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [newRating, setNewRating] = useState('');
  const [newRank, setNewRank] = useState('');
  const [newComments, setNewComments] = useState('');

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value)
  }

  const handleChangeYear = (e) => {
    setNewYear(e.target.value)
  }

  const handleChangeDirector = (e) => {
    setNewDirector(e.target.value)
  }

  const handleChangeGenre = (e) => {
    setNewGenre(e.target.value)
  }

  const handleChangeRating = (e) => {
    setNewRating(e.target.value)
  }

  const handleChangeRank = (e) => {
    setNewRank(e.target.value)
  }

  const handleChangeComments = (e) => {
    setNewComments(e.target.value)
  }

  const handleNewMovie = async (e) => {
    e.preventDefault()
    try {
      const body = { newTitle, newYear, newDirector, newGenre, newRating, newRank, newComments }
      const response = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body)
      })
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <form className="form-control" onSubmit={handleNewMovie}>
        <input name="title" onChange={handleChangeTitle} type="text" placeholder="Movie Title"/> <br/>
        <input name="year" onChange={handleChangeYear} type="number" placeholder="Year Released"/> <br/>
        <input name="director" onChange={handleChangeDirector} type="text" placeholder="Director"/> <br/>
        <input name="genre" onChange={handleChangeGenre} type="text" placeholder="Genre"/> <br/>
        <input name="rating" onChange={handleChangeRating} type="number" min="1" max="5" placeholder="Rating (1-5)"/> <br/>
        <input name="rank" onChange={handleChangeRank} type="number" min="1" max="10" placeholder="Rank"/> <br/>
        <input name="comments" onChange={handleChangeComments} type="text" placeholder="Comments"/> <br/>
        <input className="btn btn-success mt-2" type="submit" value="Add Movie"/>
      </form>
    </>
  );
}

export default AddMovie
