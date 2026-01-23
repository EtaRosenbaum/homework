import React from 'react'
import { useState, useEffect } from 'react';
import './ProductList.css'
import { useNavigate } from 'react-router';


export default function ProductList() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error(`${response.status}-${response.statusText}`);
                }
                const products = await response.json();
                setProducts(products);

            } catch (e) {
                console.error('Error fetching products:', e);
                setError(e);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts();

    }, []);

    return (
        <div className="productList">
            {loading && (
                <div className="product-list__loading">Loading...</div>
            )}

            {error && (
                <div className="product-list__error">
                    Error: {error.message}
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <ul className="productListItems">
                    {products.map(product => (
                        <li key={product.id} className="productListItem" onClick={()=> Navigate(`/product/${product.id}`)}>
                            <span className="productListTitle">
                                {product.title}
                            </span>
                            <p>${product.price}</p>

                            <img src={product.image} alt="" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
