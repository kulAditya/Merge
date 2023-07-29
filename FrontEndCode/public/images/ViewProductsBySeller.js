import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function ViewProductsBySeller() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/getAllProducts')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const sendProducts = (p) => {
    console.log("adding in cart")
    alert(p)
    console.log(JSON.stringify(p))
    var mycart = JSON.parse(localStorage.getItem("cart"));
    
    if(mycart === null)
        mycart = [];
    mycart.push(p);
    console.log(mycart.length)
    localStorage.setItem("cart",JSON.stringify(mycart));
    alert("added in the cart")
  }

  const handleDelete = (pid) => {
    fetch(`http://localhost:8080/deleteproduct?pid=${pid}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Update the list of products to reflect the deletion
        const updatedProducts = products.filter(product => product.pid !== pid);
        setProducts(updatedProducts);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  return (
    <div>
      <h1>Product List</h1>
      <table border={1} >
        <thead>
          <tr>
            <th  width="200" hight="400">Product id</th>
            <th  width="200" hight="400">Product Name</th>
            <th  width="200" hight="400">Price</th>
            <th  width="200" hight="400">Image</th>
            <th  width="200" hight="400">Video </th>
            <th width="200" hight="400"> Remove product</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td>{product.productname}</td>
              <td>{product.price}</td>
              <td><img src={`data:image/jpeg;base64,${product.image}`} height={250} width={250}  alt="product"/><br /></td>
              <td>{product.video}</td>
              <td><button className='btn btn-danger  mx-2' onClick={() => handleDelete(product.pid)}>Delete Product</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
  );
}
