import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

export default function Posts() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (! response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts)
        console.log(posts);
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
    <div> Posts:
    {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      </div>
    </>
  )
}
