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

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = { email, password }
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
      }).then((response) => response.json())
      console.log(response);
      if (response === "invalid password") {
        setWrongPasswordEntered(false)
      } else {
        props.setCurrentUser(response[0])
        setLogoutButton(false)
      }
    } catch (err) {

    }
  }

  const handleLogout = () => {
    props.setCurrentUser({})
    setLogoutButton(true)
  }

  return (
    <>
    <div className="loginButtn">
      { (logoutButton) ?
      <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
      :
      <button type="button" className="btn btn-primary mt-3" onClick={handleLogout} >Logout</button>
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
              <input className="btn btn-primary mt-2" type="submit" value="Login"/>
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
