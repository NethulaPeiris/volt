import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsData from './products.json';
import { addUserRating, getProductRatings } from './indexedDB';
import './css/ProductPage.css';

function ProductPage({ user, updateUserCart, updateUserFavorites, updateUserRatings }) {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      const productRatings = await getProductRatings(product.id);
      setRatings(productRatings);
      const avgRating = productRatings.reduce((acc, r) => acc + r, 0) / productRatings.length;
      setAverageRating(avgRating);
    };
    fetchRatings();
  }, [product.id]);

  const addToCart = () => {
    if (!user) {
      alert('Please log in to add items to the cart.');
      return;
    }
    const existingProductIndex = user.cart.findIndex(item => item.id === product.id);
    let updatedCart;
    if (existingProductIndex !== -1) {
      updatedCart = [...user.cart];
      updatedCart[existingProductIndex].quantity += quantity;
    } else {
      updatedCart = [...user.cart, { id: product.id, quantity }];
    }
    updateUserCart(updatedCart);
  };

  const addToFavorites = () => {
    if (!user) {
      alert('Please log in to add items to favorites.');
      return;
    }
    const updatedFavorites = [...user.favorites, { id: product.id }];
    updateUserFavorites(updatedFavorites);
  };

  const rateProduct = async (rating) => {
    if (!user) {
      alert('Please log in to rate products.');
      return;
    }
    await addUserRating(product.id, rating);
    const productRatings = await getProductRatings(product.id);
    setRatings(productRatings);
    const avgRating = productRatings.reduce((acc, r) => acc + r, 0) / productRatings.length;
    setAverageRating(avgRating);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className='productPage'>
      <h1>{product.name}</h1>
      <div className='wrapper'>
        <img src={product.image} alt={product.name} />
        <div>
          <p className='description'>{product.description}</p>
          <p className='price '>Rs. {product.price}</p>
          <p>Average Rating: {averageRating.toFixed(1)} / 5</p>
          <div className='actions'>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className='quantity'
            />
            <p className='addto_cart' onClick={addToCart}>Add to Cart</p>
            <p className='addto_favourites' onClick={addToFavorites}>Add to Favourites</p>
          </div>
          <div className='rate'> 
            <label>Rate this product: </label>
            {[1, 2, 3, 4, 5].map(star => (
              <p key={star} onClick={() => rateProduct(star)}>{star}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
