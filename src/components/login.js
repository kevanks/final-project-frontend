import React, {useState, useEffect} from 'react'
import '../App.css';


const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logoutButton, setLogoutButton] = useState(true)
  const [wrongPasswordEntered, setWrongPasswordEntered] = useState(true)


  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  // handles the login of a user
  const handleLogin = async (e) => {
    e.preventDefault()
    setWrongPasswordEntered(true)
    try {
      const user = { email, password }
      const response = await fetch("https://obscure-caverns-74597.herokuapp.com/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
      }).then((response) => response.json())
      if (response === "invalid password") {
        setWrongPasswordEntered(false)
      } else {
        props.setCurrentUser(response[0])
        props.setCurrentUser(response[0])
        console.log(response[0]);
        setLogoutButton(false)
        props.getMovies()
        props.setHomePage(false)
        props.setRegisterButtn(true)

      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // logs out user
  const handleLogout = () => {
    props.setCurrentUser({})
    setLogoutButton(true)
    props.setRegisterButtn(false)
    props.setHomePage(true)
  }






  return (
    <>
    <div>
      { (logoutButton) ?
      <button type="button" className="btn btn-secondary btn-lg mt-3" data-bs-toggle="modal" data-bs-target="#loginModal" >Login</button>
      :
      <div className="logoutButtns">
        <button type="button" className="btn btn-secondary mt-3" onClick={handleLogout} >Logout</button>
      </div>
      }
    </div>

    <div className="modal" id="loginModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <h3 className="text-center mt-3">Login</h3>
            <form onSubmit={handleLogin}>
              <label htmlFor='email'>Email:</label><br/>
              <input name="email" type="text" onChange={handleEmail} className="form-control" /> <br/>
              <label htmlFor='password'>Password:</label><br/>
              <input name="password" type="password" onChange={handlePassword} className="form-control" /> <br/>
              {(wrongPasswordEntered) ? null :
                <p>The password you have entered is wrong. Please try again.</p>
              }
              <input className="btn btn-secondary mt-2" type="submit" value="Login"/>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

        </div>
      </div>
    </div>

    </>
  )
}

export default Login
