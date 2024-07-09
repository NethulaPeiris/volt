import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import productsData from './products.json';
import './css/ProductsPage.css'

function ProductsPage({ user, updateUserCart }) {
  const { id } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [filters, setFilters] = useState({ category: id || '', color: '', brand: '', price: '', sort: '' });
  const selectRef = useRef(null); 
  useEffect(() => {
    selectRef.current.value = filters.category;
  });
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tag = query.get('tag');
    if (tag) {
      setFilteredProducts(productsData.filter(product => product.tags.includes(tag)));
    }
  }, [location]);

  useEffect(() => {
    let filtered = productsData;

    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    if (filters.color) {
      filtered = filtered.filter(product => product.color === filters.color);
    }
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    if (filters.sort) {
      if (filters.sort === 'priceLowToHigh') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.sort === 'priceHighToLow') {
        filtered.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredProducts(filtered);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // const handlePriceChange = (e) => {
  //   const { name, value } = e.target;
  //   const [min, max] = value.split('-').map(Number);
  //   setFilters({ ...filters, price: [min, max] });
  // };

  return (
    <div className='productsPage'>
      <h1>Products</h1>
      <div className='filters'>
        <select ref={selectRef} name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="laptops">Laptops</option>
          <option value="phones">Phones</option>
          <option value="tablets">Tablets</option>
          <option value="watches">Smart Watches</option>
          <option value="monitors">Monitors</option>
          <option value="ear_buds">Ear Buds</option>
          <option value="tv">TV</option>
        </select>
        <select name="color" onChange={handleFilterChange}>
          <option value="">All Colors</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="pink">Pink</option>
          <option value="gray">White</option>
        </select>
        <select name="brand" onChange={handleFilterChange}>
          <option value="">All Brands</option>
          <option value="samsung">Samsung</option>
          <option value="apple">Apple</option>
          <option value="lenovo">Lenovo</option>
          <option value="redimi">Redimi</option>
        </select>
        <select name="price" onChange={handleFilterChange}>
          <option value="">All Prices</option>
          <option value="0-10000">Rs. 0 - Rs. 10000</option>
          <option value="10000-50000">Rs. 10000 - Rs. 50000</option>
          <option value="50000-100000">Rs. 50000 - Rs. 100000</option>
          <option value="100000-500000">Rs. 100000 - Rs. 500000</option>
        </select>
        <select name="sort" onChange={handleFilterChange}>
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
      <div className='product_grid'>
        {filteredProducts.map((product) => (
          <div className='product' key={product.id}>
            <a href={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>Rs. {product.price}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
