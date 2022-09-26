import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateComment, deleteComment} from '../../api/comment';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './commentstyle.scss';



const Comments = ({comment, onCommentUpdate, onCommentDelete}) => {
const [isUpdated, setIsUpdated] = useState(false);
const [textUpdate, setTextUpdate] = useState(null);


const userId = useSelector((state) => state.user.userId)
const isAdmin = useSelector((state) => state.user.isAdmin)
const commentid = comment.commentid


const updateItem = async (e) => {
    e.preventDefault();
    const updatedComment = await updateComment(commentid, textUpdate)
    setIsUpdated(false)
    onCommentUpdate(commentid, textUpdate)
}

const deleteItem = async (e) => {
    e.preventDefault();
    await deleteComment(commentid)
    onCommentDelete(commentid)
}



    return (
            <div className='comment' key={comment.commentid}>
                <FontAwesomeIcon icon="fa-regular fa-circle-user" />
                <div className='comment-content'>
                    <p className='comment-author'> {comment.authorpseudo} </p>
                    {isUpdated === false && <p className='comment-text'> {comment.content} </p>}
                    {isUpdated && (
                    <div className='update-comment'>
                        <textarea
                            className='updatecomment-textarea'
                            defaultValue={comment.message}
                            onChange={(e) => setTextUpdate(e.target.value)}
                            placeholder = {comment.content}
                        />
                        <div className='buttoncomment-update'>
                            <FontAwesomeIcon icon="fa-regular fa-circle-right" onClick={updateItem}/>
                        </div>
                    </div>   
                    )}
                
                </div>
                {userId === comment.authorid && (
                    <div className='updatecomment-container'>
                        {isAdmin ? '':<FontAwesomeIcon icon="fa-regular fa-pen-to-square" onClick={() => setIsUpdated(!isUpdated)} />}
                        {isAdmin ? '':<FontAwesomeIcon icon="fa-regular fa-trash-can" onClick={deleteItem}/>}
                    </div>
                )}
                {isAdmin && (
                    <div className='admincomment-container'>
                        <FontAwesomeIcon icon="fa-regular fa-pen-to-square" onClick={() => setIsUpdated(!isUpdated)} />
                        <FontAwesomeIcon icon="fa-regular fa-trash-can" onClick={deleteItem}/>
                    </div>
                )}
            </div>
    );
};

export default Comments;