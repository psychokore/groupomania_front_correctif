import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { deleteUserAccount, getUserData, updateUserAccount } from '../../api/auth';
import { logout } from '../../slices/userSlice';
import './userProfilstyle.scss';


const UserProfil = () => {
    const [userData, setUserData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(null)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const dispatch = useDispatch()

    useEffect(() => {
        const loadUserData = async () => {
            const user = await getUserData()
            setUserData({...user.data})   
            setIsLoading(false) 
            setIsUpdated(false)
        }
        loadUserData()
    }, [])

    const deleteAccount = async (e) => {
        e.preventDefault();
        const deleteUser = await deleteUserAccount()
        dispatch(logout())

    }

    const updateProfil = async (e) => {
        e.preventDefault();
        await updateUserAccount(firstname, lastname)
        onProfilUpdate(firstname, lastname)
        setIsUpdated(false)

    }

    const onProfilUpdate = (firstname, lastname) => {
        setUserData(userData => {
            if (firstname !== userData.firstname) {
                userData.firstname = firstname
            }
            if (lastname !== userData.lastname) {
                userData.lastname = lastname
            }
            return userData
        })

    }

    return (
        <div className='profil-container'>
            <h1 className='data-title'> Mes informations</h1>
            {isUpdated === false && <>
            <div className='data-container'>
                <p className='label'>Nom</p>
                <p className='data'>{userData.lastname}</p>
                <p className='label'>Prénom</p>
                <p className='data'>{userData.firstname}</p>
            </div>
            <div className='profil-button'>
                <button className='update-profil'onClick={() => setIsUpdated(!isUpdated)} >Modifier votre profil</button>
                <button className='delete-profil' onClick={deleteAccount}>Supprimer votre profil</button>
            </div>
            </>}
            {isUpdated && (
                <div className='update-profil-container'>
                    <form action='' onSubmit={updateProfil} id='update-profil-form' className='data-container'>

                        <label htmlFor="lastname" className='label'>Nom</label>
                        <input 
                            className='data'
                            type='text' 
                            name='lastname'  
                            onChange={(e) => setLastname(e.target.value)} 
                            value={lastname}
                            placeholder={userData.lastname}
                        />
        
                        <label htmlFor="firstname" className='label'>Prénom</label>
                        <input 
                            className='data'
                            type='text' 
                            name='firstname'  
                            onChange={(e) => setFirstname(e.target.value)} 
                            value={firstname}
                            placeholder={userData.firstname}
                        />

                        <input className="button-profil" type='submit' value='Valider' /> 
                        <button className='cancel-button' onClick={() => setIsUpdated(!isUpdated)}>
                            <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" /> 
                            Annuler
                        </button>  
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserProfil;