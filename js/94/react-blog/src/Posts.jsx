import React from 'react'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Comments from './Comments';
import './Posts.css'

export default function Posts() {

  const { userId } = useParams();

  const [load, setLoading] = useState();
  const [error, setError] = useState();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const postsPerPage = 3;

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`${response.status}-${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);

      } catch (e) {
        console.error('Error fetching posts:', e);
      }
      finally {
        setLoading(false);
      }
    }
    fetchPosts();

  }, [userId]);


  return (
    <>
      <div className='PostTitle'>Posts for user {userId}</div>
      {load && (
        <div className="LoadingContainer">
          <div className="Spinner"></div>
          <p>Loading posts...</p>
        </div>
      )}

      {error && (
        <div className="ErrorContainer">
          <p>⚠️ Error loading posts. Please try again later.
            <br />
            {error}
          </p>
        </div>
      )}
         <div className='BlogPostsGrid'>
        {posts && posts.slice(currentIndex, currentIndex + postsPerPage)
          .map(posts => (
            <div className='postContainer' key={posts.id}>
              <h3>{posts.title}</h3>


              <p>{posts.body}</p>
              <button onClick={() =>
                setComments(prev => ({
                  ...prev,
                  [posts.id]: !prev[posts.id]
                }))
              }>
                {comments[posts.id] ? 'Hide Comments' : 'Show Comments'}
              </button>

              <div className='CommentsArea'>
                {comments[posts.id] && <Comments postId={posts.id} />}

              </div>
              <hr />
            </div>

          ))}
      </div>

      <div className="postPage">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - postsPerPage)}
        >
          Prev
        </button>

        <button
          disabled={currentIndex + postsPerPage >= posts.length}
          onClick={() => setCurrentIndex(prev => prev + postsPerPage)}
        >
          Next
        </button>
      </div>
    </>



  )
}
