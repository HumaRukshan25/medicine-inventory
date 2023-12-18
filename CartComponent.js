
// CartComponent.js
import React from 'react';
import './CartComponent.css'; // Import the CSS file

const CartComponent = ({ cartItems, isVisible, toggleCart, placeOrder, addedProduct }) => {
  return (
    <div className={`cart ${isVisible ? 'visible' : ''}`}>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      {addedProduct && (
        <div className="notification">
          {addedProduct.name} has been added to the cart!
        </div>
      )}
      <div className="cart-actions">
        <button className="close-button" onClick={toggleCart}>
          Close
        </button>
        <button className="order-button" onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartComponent;