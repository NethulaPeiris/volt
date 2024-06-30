import React from 'react';

function CartPage({ user, updateUserCart }) {
  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }

  const removeFromCart = (productId) => {
    const updatedCart = user.cart.filter(item => item.id !== productId);
    updateUserCart(updatedCart);
  };

  const clearCart = () => {
    updateUserCart([]);
  };

  return (
    <div>
      <h1>Cart</h1>
      {user.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {user.cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.quantity} = ${item.price * item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
