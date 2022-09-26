import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { publishPublication } from '../../api/posts';
import './postmodulestyle.scss';




const PostModule = ({onNewPublication}) => {
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    
    const token = useSelector((state) => state.user.token)
    


    const handlePost = async (e) => {
        e.preventDefault();
        const publishPost = await publishPublication(content,image, token)
        onNewPublication(publishPost)
    }


    
    const handleImage = (file) => {
        if (['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(file.type))
            {
                setImage(file)
            }
            
    }
    
    return (
        <div className='postmodule-container'>
            <form action='' onSubmit={handlePost} id='publication-form'>
                <h1 className='post-title'> Publiez quelque chose</h1>
                <input 
                    className='post-content' 
                    name='content' 
                    onChange={(e) => setContent(e.target.value)} 
                    value={content} 
                    placeholder='Taper votre texte ici'
                />
                <label htmlFor='image' className='image-input'>
                    <FontAwesomeIcon icon="fa-regular fa-image" />
                    <input 
                    className='post-image'
                    type='file'
                    id='image'
                    name='image'
                    accept='image/png, image/jpeg, image/gif, image/jpg'
                    onChange={(e) => handleImage(e.target.files[0])}
                />
                </label>
                <input className='post-button' type='submit' value='Publiez' />
            </form>
        </div>
    );
};

export default PostModule;