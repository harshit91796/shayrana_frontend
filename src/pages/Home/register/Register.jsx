import React, { useRef } from 'react'
import './register.css'
import axiosInstance from '../../../api'
import { Link, useNavigate } from 'react-router-dom';


function Register() {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) =>{
         e.preventDefault();

         if(passwordAgain.current.value !== password.current.value){
             passwordAgain.current.setCustomValidity("password doesnt match")
         }
         else{
             const user = {
                username : username.current.value,
                email : email.current.value,
                password : password.current.value,
             }
             try {
              const userData = await axiosInstance.post('/register',user)
              console.log(userData)
               if(user){
                navigate('/login')
               }
             } catch (error) {
                console.log(error)
             }
       };
    
   
         
      }
       
  
  return (
    <div className='registerContainer'>
      
           <div className="register">
             <div className="imgDiv">
                 <img className='registerImg' src="/assets/person/login2.jpg" />
             </div>
              <div className="registerLeft">
              <div className="register-form">
             
              <form action="" className="form" onSubmit={handleClick}>
                  <div className="input-group">
                      <div className="form-input">
                          <label for="fName">First Name</label>
                          <input type="text" id='fName' ref={username} placeholder="Enter first name Name"/>
                     </div>
                      <div className="form-input">
                          <label for="email">Email</label>
                          <input type="email" id='email' ref={email} placeholder="Enter email"/>
                      </div>
                      <div className="form-input">
                                <label for="password">Password</label>
                                <input type="password" minLength={6} required id='password' ref={password} placeholder="Enter first password"/>
                     </div>
                      <div className="form-input">
                          <label for="pAgain">Password again</label>
                          <input type="password" id='pAgain' minLength={6} ref={passwordAgain} required placeholder="again type the password"/>
                      </div>
                      <div className="action-btn">
                          <button type='submit' className="btn-register">register</button>
                      </div>
                      <span>or</span>
                      <div className="action-btn">
                          <Link to='/login'><button type='submit' className="btn-register">Login</button></Link>
                      </div>
                 </div>
              </form>
          
 
            </div>
              </div>

           </div>
           

    </div>
  )
}

export default Register;