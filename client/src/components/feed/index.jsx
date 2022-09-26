import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPosts } from '../../api/posts.jsx';
import './feedstyle.scss';

import PostCard from './PostCard';
import PostModule from '../postmodule/index.jsx';



const Feed = () => {
    const [allPosts, setAllPosts] = useState([])
    const [offset, setOffset] =  useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)


    
    
    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight && offset + 1 !== totalPages) {
            setOffset (prev => prev + 1);

        }
        
    }


    useEffect(() => {
       const loadPosts = async () => {
        setLoading(true);
        const newPosts = await getPosts(offset);
        setAllPosts([...allPosts, ...newPosts.data]);
        setTotalPages(newPosts.pageCount)
        setLoading(false)
    };
        loadPosts();
    }, [offset])
    
    const onNewPublication = (publication) => {
        setAllPosts([publication, ...allPosts])
    }

    const onPublicationUpdated = (postid, text, image) => {
        setAllPosts(publications => {
            const publication = publications.find (publication => publication.postid === postid)
            if (publication) {
                publication.content = text
                if (image) {
                    publication.imageurl = image
                }
            }
            return publications
        })
    }

    const onPublicationDelete = (postid) => {
        setAllPosts(allPosts.filter(publication => publication.postid !== postid))
    }


    return (
        <>
        <div className='feed-container' onScroll={handleScroll}>
            {allPosts.map((post) => (
            <PostCard post={post} key={post.postid} onPublicationUpdate={onPublicationUpdated} onPublicationDelete={onPublicationDelete}/>
            ))}
            {loading && <div className='loading'>Loading ...</div>}  
        </div>
        <PostModule onNewPublication={onNewPublication} />
        </>
        
    );
};

export default Feed



/*
const getAllPosts = async () => await getPosts(offset)
    getAllPosts()
    .then ((res) => {
        setAllPosts([...allPosts, ...res.data])
    });

*/