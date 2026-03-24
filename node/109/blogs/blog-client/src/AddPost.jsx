import React from 'react';
import './AddPost.css';
import useForm from './useForm';
import { useNavigate } from 'react-router';

export default function AddPost({setError}) {
  const [formData, setFormData] = useForm({
    title: '',
    body: ''
  });

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`${response.status} - ${msg ?? response.statusText}`);
      }

      navigate('/')
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }

  return (
    <form id="addPost" onSubmit={submit}>
      <label>title:
        <input name="title" required minLength="3" maxLength="100" value={formData.title} onChange={setFormData} />
      </label>
      <label>content:
        <textarea name="body" required minLength="3" maxLength="1000" value={formData.body} onChange={setFormData}></textarea>
      </label>

      <button>add post</button>
    </form>
  )
}
