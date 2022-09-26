import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import './logstyle.scss';


const Log = ( {signup, signin} ) =>{
    const [signUpModal, setSignUpModal] = useState(signup);
    const [signInModal, setSignInModal] = useState(signin);

    const [signInButtonModal, setSignInButtonModal] = useState(false);
    const [signUpButtonModal, setSignUpButtonModal] = useState(true);
    
    const showSignInModal = () => {
            setSignUpModal(false);
            setSignInModal(true);
            setSignInButtonModal(false);
            setSignUpButtonModal(true);

    }

    const showSignUpModal = () => {
        setSignUpModal(true);
        setSignInModal(false);
        setSignInButtonModal(true);
        setSignUpButtonModal(false);
    }


    return (
    <div className="connection-form">
        <div className="form-container">
            {signUpModal && <SignUpForm />}
            {signInModal && <SignInForm />}
        </div>
        <div className="button-container">
            {signInButtonModal && (
            <div className="logbutton">
                <p>Déjà un compte?</p>
                <button onClick={showSignInModal} className='button'>Se connecter</button>  
            </div>
            )}
            {signUpButtonModal && (
            <div className="logbutton">
            <p>Pas encore inscrit?</p>
            <button onClick={showSignUpModal} className='button'>S'inscrire</button>
            </div>
            )}
        </div>
    </div>


  );
};

export default Log