import React, { useContext, useRef } from 'react'
import './login.css'

import { AuthContext } from '../../../context/authContext';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { loginCall } from '../../../apiCalls';

function Login() {
  
  const email = useRef();
  const password = useRef();
  const {user , isFetching, login,dispatch} = useContext(AuthContext);
  
  const handleClick = (e) =>{
    e.preventDefault();
      // login({ email : email.current.value, password : password.current.value})
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
  }

  console.log(user)
  return (
    <div className='loginContainer'>
      
           <div className="login">
             <div className="imgDiv">
                 <img className='loginImg' src="/assets/person/login.jpg" />
             </div>
              <div className="loginLeft">
              <div className="login-form">
             
              <form action="" className="form" onSubmit={handleClick}>
                  <div className="input-group">
                  <div className="form-input">
                      <label htmlFor="email">Email</label>
                      <input type="email" id='email' required ref={email} placeholder="Enter email"/>
                   </div>
                      <div className="form-input">
                          <label htmlFor="password">Password</label>
                          <input type="password" ref={password} minLength={6} required id='password' placeholder="Enter first password"/>
                     </div>

                      <div className="action-btn">
                          <button  className="btn-login" disabled={isFetching}>{isFetching ? <CircularProgress size="15px" /> : "Log In"}</button>
                      </div>
                      <div className="or">or</div>
                      <div className="action-btn">
                          <Link to='/register'><button className="btn-login">sign-up</button></Link>
                      </div>
                 </div>
              </form>
          
 
            </div>
              </div>

           </div>
           

    </div>
  )
}

export default Login