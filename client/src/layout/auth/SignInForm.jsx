import React, { useState } from "react";
import {postConnexion} from "../../api/auth";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";


const SignInForm = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState (false);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
 


  const handleLogin = async (e) => {
    e.preventDefault();

    const postLogin = await postConnexion(email, password)
      if (postLogin){
        dispatch(
          login({
            userId: postLogin.userId,
            token: postLogin.token,
            isAdmin: postLogin.isAdmin
          })
        )
        navigate('/');  
      } else {
        setHasError(true)
      }
  }
  
  
  return (
      <form action="" onSubmit={handleLogin} id='sign-in-form'>
      
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
         <div className="error">Les identifiants sont incorrects.</div>
        )}
      

        <input className="button" type='submit' value='Connexion' />
        </form>
  );
};


export default SignInForm