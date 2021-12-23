import React, { useState } from 'react'
import axios from 'axios'

const CommentCreate = ({postId}) => {
    const [comment,setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://posts.com/posts/${postId}/comments`,{
            content:comment
        })
        setComment("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={comment} onChange={e => setComment(e.target.value)} type="text" className='form-control' />
                </div>
                <br/>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default CommentCreate
