import React from "react";
import Log from "../layout/auth";


const Login = () =>{
  return (
    <div className="profil-page">
      <div className="log-container">
        <div className="img-container">
          <img src="./img/icon-left-font-monochrome-white.png" alt="logo groupomania"/>
        </div> 

        <Log signin={true} signup={false} />
      </div>
    </div>
  );
};

export default Login