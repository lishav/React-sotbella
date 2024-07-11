import React, { useState, useEffect } from 'react';


const Filter = ({ onSort, onFilter, categories, brands }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
 

  useEffect(() => {
    onFilter({ category, priceRange, });
  }, [category, priceRange, onFilter]);

  return (
    <div className="filter-section">
      <h2>Sort By</h2>
      {/* <select onChange={(e) => onSort(e.target.value)}>
        <option value="">Select</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select> */}
      
     
      <div>
       
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className='Product-filter'>
        <select onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Price Range</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100-200">100 - 200</option>
          <option value="200-500">200 - 500</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
