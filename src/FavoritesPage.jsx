import React from 'react';
import './css/Cart.css';
import { IoTrashBin } from "react-icons/io5";

function FavoritesPage({ user, updateUserFavorites }) {
  if (!user) {
    return <div  className='cartPage'>Please log in to view your favorites.</div>;
  }

  const removeFromFavorites = (productId) => {
    const updatedFavorites = user.favorites.filter(item => item.id !== productId);
    updateUserFavorites(updatedFavorites);
  };

  return (
    <div className='cartPage'>
      <h1>Favorites</h1>
      {user.favorites.length === 0 ? (
        <p>You have no favorite items</p>
      ) : (
        <div className='items'>
            {user.favorites.map((item, index) => (
              <div className='item_fav' key={index}>
                <p>{item.name}</p>
                <p>Rs. {item.price}</p>
                <IoTrashBin onClick={() => removeFromFavorites(item.id)} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
