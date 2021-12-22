import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CommentList = ({postId}) => {
    const [comments,setComments]= useState([])
    const fetchData = async () => {
        const result = await axios.get(`http://localhost:5002/posts/${postId}/comments`);
        setComments(result.data)
    }

    useEffect(()=>{
        fetchData();
    },[])

    const renderedComments = comments && comments.map(comment => {
        return <li key={comment.commentId}>{comment.content}</li>
    })

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList
