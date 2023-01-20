import React, {useState, useEffect} from 'react'
import '../App.css';

const Register = (props) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(true)
  const [logoutButton, setLogoutButton] = useState(true)
  const [emailTaken, setEmailTaken] = useState(true)

  const makeUsername = (e) => {
    setUsername(e.target.value)
  }

  const makeEmail = (e) => {
    setEmail(e.target.value)
  }

  const makePassword = (e) => {
    setPassword(e.target.value)
  }

  const makePassword2 = (e) => {
    setPassword2(e.target.value)
  }

  // handles registering new user
  const handleRegister = async (e) => {
    e.preventDefault()
    setPasswordsDontMatch(true)
    setEmailTaken(true)
    try {
      const newUser = { email, username, password }
      if (password === password2) {
        const response = await fetch("http://localhost:5000/users/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(newUser)
        }).then((response) => response.json())
        if (response === "user is already created") {
          setEmailTaken(false)
        } else {
          props.setCurrentUser(response[0])
        }
      } else {
        setPasswordsDontMatch(false)
        return
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const registerButton = () => {

  }

  // logs out user
  const handleLogout = () => {
    props.setCurrentUser({})
    setLogoutButton(true)
  }

  return (
    <>
    <div className="loginButtn">
      { (logoutButton) ?
      <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#registerModal" onClick={registerButton} >Register</button>
      :
      <button type="button" className="btn btn-primary mt-3" onClick={handleLogout} >Logout</button>
      }
    </div>
      <div class="modal" id="registerModal">
        <div class="modal-dialog">
          <div class="modal-content">

          <div class="modal-body">
            <h3 className="text-center mt-3">Register</h3>
            <form onSubmit={handleRegister}>
              <label htmlFor='username'>Username:</label><br/>
              <input name="username" type="text" onChange={makeUsername} className="form-control" /> <br/>
              <label htmlFor='email'>Email:</label><br/>
              <input name="email" type="text" onChange={makeEmail} className="form-control" /> <br/>
              {(emailTaken) ? null :
                <p>This email is already registered to an account. Please login or use a different email.</p>
              }
              <label htmlFor='password'>Password:</label><br/>
              <input name="password" type="password" onChange={makePassword} className="form-control" /> <br/>
              <label htmlFor='password2'>Confirm Password:</label><br/>
              <input name="password2" type="password" onChange={makePassword2} className="form-control" /> <br/>
              {(passwordsDontMatch) ? null :
                <p>Passwords do not match. Please try again.</p>
              }
              <input className="btn btn-primary mt-2" type="submit" value="Register" />
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register
