import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import './navbarstyle.scss';

const NavBar = () => {

const dispatch = useDispatch();
const navigate = useNavigate();







    return (
        <div className='heading-container'>
            <div className="navbar-img-container">
                <img src="./img/icon-left-font-monochrome-white.png" alt="logo groupomania"/>
            </div> 
            <div className='navbar-container'>
                <FontAwesomeIcon icon="fa-solid fa-house" onClick={() => navigate('/')}/>
                <p className='profil-link' onClick={() => navigate('/profil')}>Mon compte</p>
                <p className='logout' onClick={() => dispatch(logout())}> Se déconnecter</p>
            </div>
        </div>
    );
};

export default NavBar;