import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import './App.css'


export default function Blogs() {
    const Navigate = useNavigate();

    const [load, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`${response.status}-${response.statusText}`);
                }
                const blogs = await response.json();
                setBlogs(blogs);

            } catch (e) {
                console.error('Error fetching blogs:', e);
                setError(e.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchBlogs();

    }, []);



    return (
        <>
            {load && (
                <div className="LoadingContainer">
                    <div className="Spinner"></div>
                    <p>Loading Blogs...</p>
                </div>
            )}
            {error && (
                <div className="ErrorContainer">
                    <p>⚠️ Error loading blogs. Please try again later
                        <br />{error}</p>
                </div>
            )}
                   <div className='BlogContainer'>
                {blogs && blogs.map(blog => (
                    <div key={blog.id} className='blogCard'>
                        <h2> UserName {blog.name}</h2>
                        <p>Website: {blog.website}</p>
                        <p>Company: {blog.company.name}</p>
                        <div className='cardContent' >
                            <p>{blog.company.catchPhrase}</p>
                            <button onClick={() => Navigate(`/posts/${blog.id}`)}>Posts</button>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}
