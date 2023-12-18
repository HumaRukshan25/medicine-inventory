// FormComponent.js
import React, { useState } from 'react';
import './FormComponent.css'; // Import the CSS file

const FormComponent = ({ addProduct }) => {
  const [medicine, setMedicine] = useState({ name: '', description: '', price: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const validateForm = () => {
    if (!medicine.name || !medicine.description || !medicine.price) {
      setError('Please fill in all fields');
      return false;
    }

    if (isNaN(medicine.price) || parseFloat(medicine.price) <= 0) {
      setError('Please enter a valid price');
      return false;
    }

    setError('');
    return true;
  };

  const handleAddProduct = () => {
    if (validateForm()) {
      // Retrieve existing products from localStorage
      const existingProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
      // Add the new product
      const updatedProducts = [...existingProducts, { ...medicine, id: Date.now() }];
      // Save the updated products to localStorage
      localStorage.setItem('addedProducts', JSON.stringify(updatedProducts));

      // Call the addProduct function to update the state in the parent component
      addProduct(medicine);

      // Clear the form fields
      setMedicine({ name: '', description: '', price: '' });
    }
  };

  return (
    <div className="form-container">
      <h2>Add Medicine</h2>
      {error && <div className="error-message">{error}</div>}
      <form>
        <label>
          Medicine Name:
          <input type="text" name="name" value={medicine.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={medicine.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" name="price" value={medicine.price} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default FormComponent;
