// ProductComponent.js
import React, { useState, useEffect } from 'react';
import './ProductComponent.css'; // Import the CSS file

const ProductComponent = ({ products, addToCart }) => {
  const [quantity, setQuantity] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    // Retrieve saved quantities from localStorage on component mount
    const savedQuantities = JSON.parse(localStorage.getItem('cartQuantities')) || {};
    setQuantity(savedQuantities);
  }, []);

  const handleQuantityChange = (productId, value) => {
    // Check if the value is a positive integer greater than 0
    const isValidQuantity = /^\d+$/.test(value) && parseInt(value, 10) > 0;

    // Update the error state based on the validation result
    setError({ ...error, [productId]: isValidQuantity ? '' : 'Quantity must be a positive integer' });

    if (isValidQuantity) {
      setQuantity({ ...quantity, [productId]: value });
      // Save quantities to localStorage
      localStorage.setItem('cartQuantities', JSON.stringify({ ...quantity, [productId]: value }));
    }
  };

  return (
    <div className="product-container">
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div className="product-info">
              {product.name} - {product.description} - ${product.price}
            </div>
            <input
              type="number"
              value={quantity[product.id] || ''}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              className="product-input"
            />
            <button
              onClick={() => addToCart(product, quantity[product.id] || 0)}
              className="product-button"
            >
              Add to Cart
            </button>
            {/* Display the error message if present */}
            {error[product.id] && <p className="error-message">{error[product.id]}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductComponent;
