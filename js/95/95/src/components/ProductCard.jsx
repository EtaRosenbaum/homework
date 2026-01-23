import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './ProductCard.css';


export default function ProductCard({addToCart}) {

    const { id } = useParams();

    const [load, setLoading] = useState();
    const [error, setError] = useState();
    const [product, setProduct] = useState();

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error(`${response.status}-${response.statusText}`);
                }
                const product = await response.json();
                setProduct(product);

            } catch (e) {
                console.error('Error fetching product:', e);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();

    }, [id]);





    return (
        <>
            {load && <div>Loading...</div>}
            {error && <div>error...</div>}
            {product && <div className='ProductCard' key={id}>
                <div>{product.title}</div>
                <div>${product.price}</div>
                <div>{product.description}</div>
                <img src={product.image} alt="" />
                <button onClick={()=>addToCart(product)}>Add To Cart</button>
                </div>}

        </>
    )
}
