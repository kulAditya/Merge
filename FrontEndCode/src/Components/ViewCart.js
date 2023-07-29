import React, { useState } from 'react';

function ThankYou(props) {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Thank you for shopping with us!</h2>
            </div>
            <div className="card-body">
              <p className="card-text">Confirmation details will be sent to {props.user.emailid}.</p>
              <p className="card-text">Your order will be delivered in 3-4 days to your registered address {props.user.address}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ViewCart() {
  const [cart, setCart] = useState([]);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const user = JSON.parse(localStorage.getItem('loggedUser'));

  // Retrieve cart data from localStorage on component mount
  React.useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product removed from cart!');
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      let price = parseFloat(JSON.parse(cart[i]).price);
      if (!isNaN(price)) {
        totalPrice += price;
      }
    }
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(totalPrice);
    return `Total Price: ${formattedPrice}`;
  };

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      {isOrderPlaced ? (
        <ThankYou user={user} />
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price(In rupees)</th>
                <th>Image</th>
                <th>Remove Item</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product, index) => {
                const parsedProduct = JSON.parse(product);
                return (
                  <tr key={index}>
                    <td>{parsedProduct.productname}</td>
                    <td>{parsedProduct.price}</td>
                    <td><img src={`data:image/jpeg;base64,${parsedProduct && parsedProduct.image}`} height={250} width={250}  alt="product"/></td>
                    <td><button className='btn btn-danger' onClick={() => removeFromCart(index)}>remove</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="card mt-4">
            <div className="card-body">
              <strong style={{ color: 'red' }}>{calculateTotalPrice()}</strong>
            </div>
          </div>
          <button className="btn btn-primary mt-4" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}
