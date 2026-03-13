import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function AddPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const newPost = { title, content, author };
    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      if (response.status === 201) {
        const saved = await response.json();
        console.log(saved);
        navigate('/posts');
        setMessage('Post added successfully!');
        setTitle('');
        setContent('');
        setAuthor('');
      } else {
        setMessage(`Failed to add post: ${response.status}`);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }


  return (
    <>
      <div>Add post: </div>
      <form id='addPostForm' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />

        <div>

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>


        <button type='submit'>Add Post</button>
      </form>
      <p>{message}</p>
    </>
  );
}







