import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Network Error');
        }
        const product = await response.json();
        setProduct(product);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const colors = ['Red', 'Blue', 'Green', 'Black']; // Example colors
  const sizes = ['S', 'M', 'L', 'XL']; // Example sizes

  return (
    <div className="product-detail">
      <div className="info-image">
        <img className="productPage-img" src={product.image} alt={product.title} />
      </div>
      <div className="info-content">
        <h2 className='product-head'>{product.title}</h2>
        <p className='product-desc'>{product.description}</p>
        <div className='product-price-info'>
        <p>Price: Rs {product.price}</p>
        <p>Rating: {product.rating.rate} ({product.rating.count})</p>
        <p>Category: {product.category}</p>
        </div>

        <div className="product-variations">
          <div className="variation">
            <p className='product-size'>Size:</p>
            <div className="size-options">
              {sizes.map((size) => (
                <div
                  key={size}
                  className={`size-box ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className="variation">
            <p className='product-color'>Color:</p>
            <div className="color-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => handleColorChange(color)}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
