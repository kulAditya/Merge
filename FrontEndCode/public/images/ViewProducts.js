import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate, json } from 'react-router-dom'

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getAllProducts')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const sendProducts=(p)=>{
    console.log("adding in cart")
    
    console.log(JSON.stringify(p))
    var mycart=JSON.parse(localStorage.getItem("cart"));
    //var total=localStorage.getItem("total",total);
    
    if(mycart === null)
        mycart = [];
    mycart.push(p);
    console.log(mycart.length)
   
    localStorage.setItem("cart",JSON.stringify(mycart));
    alert("added in the cart")
    

  }

  return (
    <div>
    <h1>Product List</h1>
    <table border={1}>
      <thead>
        <tr>
          <th  width="200" hight="400">Product_id</th>
          <th  width="200" hight="400">Product Name</th>
          <th  width="200" hight="400">Price</th>
          <th  width="200" hight="400">Image</th>
          <th  width="200" hight="400">Video Link</th>
          <th  width="200" hight="400">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.pid}>
            <td>{product.pid}</td>
            <td>{product.productname}</td>
            <td>{product.price}</td>
            <td><img src={`data:image/jpeg;base64,${product && product.image}`} height={250} width={250}  alt="product"/></td>
            <td>{product.video}</td>
           {/*<td> {JSON.stringify(product)}</td>*/}
            <td><button className='btn btn-primary  mx-2' onClick={()=>{sendProducts(JSON.stringify(product))}}>add to cart</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div> 



  );
}
