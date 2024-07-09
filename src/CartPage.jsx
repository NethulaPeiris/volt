import React from 'react';
import './css/Cart.css';
import { IoTrashBin } from "react-icons/io5";

function CartPage({ user, updateUserCart }) {
  if (!user) {
    return <div className='cartPage'>Please log in to view your cart.</div>;
  }

  const removeFromCart = (productId) => {
    const updatedCart = user.cart.filter(item => item.id !== productId);
    updateUserCart(updatedCart);
  };

  const clearCart = () => {
    updateUserCart([]);
  };

  return (
    <div className='cartPage'>
      <h1>Cart</h1>
      {user.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className='items'>
          {user.cart.map((item, index) => (
            <div className='item' key={index}>
              <p>{item.name}</p>
              <p>Rs. {item.price}</p>
              <p>{item.quantity}</p>
              <p>Rs. {item.price * item.quantity}</p>
              <IoTrashBin onClick={() => removeFromCart(item.id)} />
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
