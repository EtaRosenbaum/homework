import React, { useState } from 'react'
import { useEffect } from 'react'
import Post from './Post';
import io from 'socket.io-client';

export default function Posts({ setError }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:8080/posts');
        if (!response.ok) {
          const msg = await response.text();
          throw new Error(`${response.status} - ${msg ?? response.statusText}`);
        }
        const postData = await response.json();
        setPosts(postData);
      } catch (e) {
        console.error(e);
        setError(e.message);
      }
    })();
  }, []);

  const socketIo = io('http://localhost:8080');
  useEffect(() => {
    function addPost(post) {
      console.log(posts);
      setPosts([...posts, post]);
    }
    socketIo.on('post', addPost);

    function addComment({ postId, comment }) {
      setPosts(posts.map(p => p._id === postId ? { ...p, comments: [...(p.comments || []), comment] } : p));
    }
    socketIo.on('comment', addComment);

    return () => {
      socketIo.off('post', addPost);
      socketIo.off('comment', addComment)
    }
  }, [posts, socketIo]);

  return (
    <div>
      {posts?.map(p => <Post key={p._id} post={p} setError={setError} />)}
    </div>
  )
}