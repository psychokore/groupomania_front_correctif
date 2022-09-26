import React, { useState } from "react";
import {postInscription, postConnexion, getRefreshToken} from "../../api/auth";
import {useNavigate} from 'react-router-dom';

import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";


const SignUpForm = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [hasError, setHasError] = useState (false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    const postSignup = await postInscription(email, password, firstname, lastname)
    if (postSignup){
      const postLogin = await postConnexion(email, password)
      if (postLogin){
        dispatch(
          login({
            token: postLogin.token,
            isAdmin: postLogin.isAdmin
          })
        )
        navigate('/');  
      } else {
        setHasError(true)
      }
    } else {
      setHasError(true)
    }
  }


  return (
    <form action="" onSubmit={handleRegister} id='sign-up-form'>

        <label htmlFor="lastname">Nom</label>
        
        <input 
          className="textarea"
          type='text' 
          name='lastname'  
          onChange={(e) => setLastname(e.target.value)} 
          value={lastname}
        />
        
        <label htmlFor="firstname">Prénom</label>
        
        <input 
          className="textarea"
          type='text' 
          name='firstname'  
          onChange={(e) => setFirstname(e.target.value)} 
          value={firstname}
        />
      
        <label htmlFor="email">Email</label>
        
        <input 
          className="textarea"
          type='text' 
          name='email'  
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
        

        <label htmlFor="password">Mot de passe</label>
        
        <input
         className="textarea"
         type='password' 
          name='password'  
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
        {hasError && (
         <div className="error">Saisie incorrecte.</div>
        )}
      

        <input className="button" type='submit' value='Inscription' />
        </form>
  );
};

export default SignUpForm