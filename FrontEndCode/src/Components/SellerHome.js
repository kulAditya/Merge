import { Link, Outlet, Route, Routes } from 'react-router-dom';
import allImg from '../images/all1.jpg';
import { useEffect, useState } from 'react';


export default function SellerHome(){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    setUser(loggedUser);
  }, []);

    return(
        
         <div className="App">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="addproducts">Add product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="view_products">View Products</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Logout</Link>
                </li>
              </ul>
            </div>
           </nav>
            <h1 className='bg-danger text-white'>Welcome Seller :{user && user.firstname}</h1>
            <img width={1265} height={600} src={allImg}/>
            <Outlet/>

            
        </div>
    )
}