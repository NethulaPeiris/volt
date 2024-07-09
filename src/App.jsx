import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ProductsPage from './ProductsPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import FavoritesPage from './FavoritesPage';
import { getUser, updateUser, getUserCart, getUserFavorites } from './indexedDB';
import './App.css';

import './css/Header.css'
import logo from './Img/logo.png';
import hot from './Img/hot.png';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from "react-icons/fa";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUserCart = async (updatedCart) => {
    const updatedUser = { ...user, cart: updatedCart };
    await updateUser(updatedUser);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateUserFavorites = async (updatedFavorites) => {
    const updatedUser = { ...user, favorites: updatedFavorites };
    await updateUser(updatedUser);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div>
        <div className="nav">
          <a href='/'><img src={logo} alt="Volt Store Logo" className="logo" /></a>
          <div class="categories_button" onMouseOver={() => {
            document.querySelector('.categories_button_list').style.display = "flex";
          }} onMouseLeave={() => {
            document.querySelector('.categories_button_list').style.display = "none";
          }}>
            <p class="categories_button_text">Categories</p>
            <div class="categories_button_list">
              <a href='/products/laptops'>Laptops</a>
              <a href='/products/phones'>Mobile Phones</a>
              <a href='/products/tablets'>Tablets</a>
              <a href='/products/watches'>Smart Watches</a>
              <a href='/products/ear_buds'>Ear Buds</a>
              <a href='/products/monitors'>Monitors</a>
              <a href='/products/tv'>Smart TV</a>
              <a href='/products'>All Categories</a>
            </div>
          </div>
          <div className="hot_deals_button">
            <p>Today</p>
            <p>Hot Deals</p>
            <img src={hot} alt="Hot Deals" className="hot_deals_icon" />
          </div>
          <div className="search_box">
            <input type="text" id="search_bar" className="search_bar" placeholder="Search..." />
          </div>
          <div className="user">
            {user ? (
              <>
                <a href='/cart'><MdOutlineShoppingCart className='shopping_cart' /></a>
                <a href='/favorites'><FaRegHeart className='favourites' /></a>
                <p className='logout_button' onClick={handleLogout}>Logout</p>
              </>
            ) : (
              <>
                <a className='login_button' href="/login">Login</a>
                <a className='signup_button' href="/signup">Signup</a>
              </>
            )}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage setUser={(user) => { setUser(user); localStorage.setItem('user', JSON.stringify(user)); }} />} />
          <Route path="/signup" element={<SignupPage setUser={(user) => { setUser(user); localStorage.setItem('user', JSON.stringify(user)); }} />} />
          <Route path="/cart" element={<CartPage user={user} updateUserCart={updateUserCart} />} />
          <Route path="/favorites" element={<FavoritesPage user={user} updateUserFavorites={updateUserFavorites} />} />
          <Route path="/product/:id" element={<ProductPage
            user={user}
            updateUserCart={updateUserCart}
            updateUserFavorites={updateUserFavorites}
            updateUserRatings={(updatedRatings) => {
              const updatedUser = { ...user, ratings: updatedRatings };
              updateUser(updatedUser);
              setUser(updatedUser);
              localStorage.setItem('user', JSON.stringify(updatedUser));
            }}
          />} />
          <Route path="/products" element={<ProductsPage user={user} updateUserCart={updateUserCart} />} />
          <Route path="/products/:id" element={<ProductsPage user={user} updateUserCart={updateUserCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
