import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
    const [posts,setPosts]=useState({});
    const fetchPosts = async() =>{
        const result = await axios.get("http://localhost:5003/posts")
        setPosts(result.data)
    }

    useEffect(()=>{
        fetchPosts();
    },[])
     
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div key={post.id} className="card" style={{width:"30%",marginBottom:"20px"}}>
                 <h3>{post.title}</h3>
                 <CommentList comments={post.comments}/>
                 <CommentCreate postId={post.id}/>
            </div>
        )
    })
    return (
        <div className='d-flex flex-row flex-wrap justify-content-between '>
           {renderedPosts}
        </div>
    )
}

export default PostList
