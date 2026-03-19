import React from 'react';
import './AddPost.css';
import useForm from './useForm';
import { useNavigate } from 'react-router';

export default function AddPost() {
  const [formData, setFormData] = useForm({
    title: '',
    content: ''
  });

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(formData),
        headers: {
          'content-type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const post = await response.json();
  console.log('New post added', post);

      navigate('/')
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form id="addPost" onSubmit={submit}>
      <label>title:
        <input name="title" required value={formData.title} onChange={setFormData} />
      </label>
      <label>content:
        <textarea name="content" value={formData.content} onChange={setFormData}></textarea>
      </label>

      <button>add post</button>
    </form>
  )
}
