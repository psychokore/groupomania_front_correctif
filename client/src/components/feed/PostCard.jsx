import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { dateParser } from './date';
import { useState, useEffect } from 'react';
import Comments from './Comments';
import { getComments } from '../../api/comment'
import PostingComment from './PostingComment';
import { addLike, deleteLike, getLikes } from '../../api/like';
import { useSelector } from 'react-redux';
import { deletePublication, updatePublication} from '../../api/posts'




const PostCard = ({post, onPublicationUpdate, onPublicationDelete}) => {
    const [allComments, setAllComments] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [offset, setOffset] =  useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [showComment, setShowComment] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [image, setImage] = useState(null)
    



    const postid = post.postid
    const userId = useSelector((state) => state.user.userId)
    const isAdmin = useSelector((state) => state.user.isAdmin)

    useEffect(() => {
        const loadComments = async () => {
         const newComments = await getComments(postid, offset, userId);
         setAllComments([...allComments, ...newComments.data]);
         setTotalPages(newComments.pageCount)
        };
        loadComments(); 
     }, [offset])


     useEffect(() => {
        const loadLikes = async () => {
            const newLikes = await getLikes(postid);
            setAllLikes([...allLikes, ...newLikes.data])
         };
         loadLikes();
     }, [])



     const loadMoreComment = (offset, allComments) => {
        if (offset + 1 > totalPages && allComments.lenght !== undefined) 
            return <p className='show-more-comment' onClick={() => setOffset(offset + 1)}>Afficher des commentaires plus anciens</p>;
        else  
            return <p className='no-more-comment'>Fin des commentaires</p>;
    }

    const handleLike = async (e) => {
        e.preventDefault();
        const addLikeHere = await addLike(postid);
        onNewLike(addLikeHere)
        
    }

    const handleDislike = async (e) => {
        e.preventDefault();
        await deleteLike(postid);
        onDislike()
        
    }


    const likeDislike = (allLikes, userId) => {
        let like = allLikes.find (like => like.userId === userId) 
        if (like === undefined)
            return <FontAwesomeIcon icon="fa-regular fa-heart" onClick={handleLike} />
        else
            return <FontAwesomeIcon icon="fa-solid fa-heart" onClick={handleDislike}/>
                     
    }

    const onNewComment = (comment) => {
        setAllComments([comment, ...allComments])
    }

    const onCommentUpdate = (commentid, text) => {
        setAllComments(comments => {
            const comment = comments.find (comment => comment.commentid === commentid)
            if (comment) {
                comment.content = text
            }
            return comments
        })
    }

    const onCommentDelete = (commentid) => {
        setAllComments (allComments.filter(comment => comment.commentid !== commentid))
    }

    const onNewLike = (like) => {
        setAllLikes([like, ...allLikes])
    }

    const onDislike = () => {
        setAllLikes(allLikes.filter(like => like.userId !== userId ))
    }

    const updateItem = async (e) => {
        e.preventDefault();
        const updatePost = await updatePublication(postid, textUpdate, image)
        setIsUpdated(false)
        onPublicationUpdate(postid, textUpdate, updatePost.imageurl)
    }

    const deleteItem = async (e) => {
        e.preventDefault();
        const deletePost = await deletePublication(postid)
        onPublicationDelete(postid)
    }

    const handleImage = (file) => {
        if (['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(file.type))
            {
                setImage(file)
            }
            
    }
    


    return (
        <div className='post-container'>

           <div className='author-container'>
            <FontAwesomeIcon icon="fa-regular fa-circle-user" />
            <h2> {post.authorpseudo} </h2>
            <h3> {dateParser(post.create_at)} </h3>
           </div>

           <div className='content-container'>
                {isUpdated ===false && <div className='content-text'> {post.content} </div>} 
                {isUpdated && (
                    <div className='update-post'>
                        <textarea
                            className='update-textarea'
                            defaultValue={post.message}
                            onChange={(e) => setTextUpdate(e.target.value)}
                            placeholder = {post.content}
                        />
                        <input 
                            className='post-image'
                            type='file'
                            id='image'
                            name='image'
                            accept='image/png, image/jpeg, image/gif, image/jpg'
                            onChange={(e) => handleImage(e.target.files[0])}
                        />
                        <div className='button-update'>
                            <FontAwesomeIcon icon="fa-regular fa-circle-right" onClick={updateItem}/>
                        </div>
                    </div>   
                )}
                { post.imageurl !== null && <img className = "post-image" src={post.imageurl} alt=''/> }
                {userId === post.authorid && (
                    <div className='update-container'>
                        {isAdmin ? '':<FontAwesomeIcon icon="fa-regular fa-pen-to-square" onClick={() => setIsUpdated(!isUpdated)} />}
                        {isAdmin ? '':<FontAwesomeIcon icon="fa-regular fa-trash-can" onClick={deleteItem}/>}
                    </div>
                )}
                {isAdmin && (
                    <div className='delete-container'>
                        <FontAwesomeIcon icon="fa-regular fa-pen-to-square" onClick={() => setIsUpdated(!isUpdated)} />
                        <FontAwesomeIcon icon="fa-regular fa-trash-can" onClick={deleteItem}/>
                    </div>
                )}
                
                

           </div>

           <div className='interaction-container'>
                <div className='like-container'>
                    <p>{allLikes.length}</p>
                    {likeDislike(allLikes, userId)}
                </div>
                <div className='comments-container'>
                    <p>{allComments.length}</p>
                    <FontAwesomeIcon icon="fa-regular fa-comments" onClick={() => setShowComment(!showComment)} className={showComment ? 'active' : ''}/>   
                </div>
           </div>
           {showComment && allComments.map((comment) => (<Comments comment={comment} key={comment.commentid} onCommentUpdate={onCommentUpdate} onCommentDelete={onCommentDelete}/>))} 
           {showComment && <>{loadMoreComment(offset, allComments)}</> }
           {showComment && <PostingComment post={post} onNewComment={onNewComment}/>}
        </div>
    );
};

export default PostCard;


