import React, { useEffect, useState } from 'react';
import './Product.css';
import Filter from './Fliter';

const ProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('grid'); // grid or list
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network Error');
        }
        const products = await response.json();
        setProducts(products);
        setFilteredProducts(products);
        setLoading(false);

        // Extract categories and brands
        const categories = [...new Set(products.map(product => product.category))];
        setCategories(categories);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (sortValue) => {
    let sorted = [...filteredProducts];
    if (sortValue === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'popularity') {
      sorted.sort((a, b) => b.rating.count - a.rating.count);
    } else if (sortValue === 'rating-asc') {
      sorted.sort((a, b) => a.rating.rate - b.rating.rate);
    } else if (sortValue === 'rating-desc') {
      sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    setFilteredProducts(sorted);
  };

  const handleFilter = ({ category, priceRange, brand }) => {
    let filtered = [...products];
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }
    if (brand) {
      filtered = filtered.filter(product => (product.brand || 'Unknown') === brand);
    }
    setFilteredProducts(filtered);
  };

  return (
    <div className="main-container">
      <Filter onSort={handleSort} onFilter={handleFilter} categories={categories} />
      <div className="product-container">
        <div className="view-toggle">
          <button onClick={() => setView('grid')}>Grid View</button>
          <button onClick={() => setView('list')}>List View</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className={`product-section ${view}`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img className='product-img' src={product.image} alt={product.title} />
                </div>
                <div className='product-title-info'>
                  <div className="product-info">
                    <h2 className='product-title'>{product.title}</h2>
                  </div>
                  <div className='product-price'>
                    <p className='sp-price'>Rs {product.price}</p>
                  </div>
                </div>
                <div className='product-rate-count'>
                  <div className='product-rating'>
                    <p className='rating'>Rating {product.rating.rate}</p>
                  </div>
                  <div className='product-rating-count'>
                    <p className='count'>Count {product.rating.count}</p>
                  </div>
                  <div className='product-category'>
                    <p className='category'>{product.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFetch;
