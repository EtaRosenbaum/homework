import React from 'react'
import { useState, useEffect } from 'react';

export default function Comments({ postId }) {

  const [load, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      if (!postId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error(`${response.status}-${response.statusText}`);
        }
        const comments = await response.json();
        setComments(comments);

      } catch (e) {
        console.error('Error fetching comments:', e);
      }
      finally {
        setLoading(false);
      }
    }
    fetchComments();

  }, [postId]);


  return (
    <>
      <div>comments for post {postId}</div>
      {load && (
        <div className="LoadingContainer">
          <div className="Spinner"></div>
          <p>Loading comments...</p>
        </div>
      )}
      {error && (
        <div className="ErrorContainer">
          <p>⚠️ Error loading blogs. Please try again later.
            <br />
            {error}
          </p>
        </div>
      )}
      {comments && comments.map(comment => (
        <div className='commentContainer' key={comment.id}>


          <p>{comment.body}</p>
        </div>
      ))}
    </>

  )
}
