import React from 'react'
import './Cart.css';
export default function Cart({cart, deleteItem}) {


    return (
        <>
            {cart.length === 0 && <p className="cart-empty">Your cart is empty</p>}

            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-price">${item.price}</p>
                    <button className="cart-item-remove" onClick={() => deleteItem(item.id)}>
                        Remove From Cart
                    </button>
                </div>
            ))}
        </>
    )
}
