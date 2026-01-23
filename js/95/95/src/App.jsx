import ProductList from './components/ProductList'
import { Outlet } from 'react-router'
import './App.css'
import ProductCard from './components/ProductCard'
import NoPageFound from './NoPageFound'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './Header'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [addedToCart, SetAddedToCart] = useState(null);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    SetAddedToCart('Added to cart!');

    setTimeout(() => SetAddedToCart(null), 2000);
  };

  useEffect(() => {

    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  function deleteItem(productId) {
    setCart(prev => prev.filter(product => product.id !== productId));
  }





  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>

          <Header />
          {addedToCart && <div className="notification">{addedToCart}</div>}

          <Outlet />
        </>}>



        <Route index element={<ProductList />} />

        <Route path="/product/:id" element={<ProductCard addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} deleteItem={deleteItem} />} />

        <Route path="*" element={<NoPageFound />} />
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
