import React from 'react';

function FavoritesPage({ user, updateUserFavorites }) {
  if (!user) {
    return <div>Please log in to view your favorites.</div>;
  }

  const removeFromFavorites = (productId) => {
    const updatedFavorites = user.favorites.filter(item => item.id !== productId);
    updateUserFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1>Favorites</h1>
      {user.favorites.length === 0 ? (
        <p>You have no favorite items</p>
      ) : (
        <div>
          <ul>
            {user.favorites.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromFavorites(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
