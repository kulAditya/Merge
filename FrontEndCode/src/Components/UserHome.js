import { useEffect, useState } from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import myImage from '../images/music1.jpeg';
 

export default function UserHome(){

  const [user,setUser]=useState(null);
  
  useEffect(()=>{

   const loginid= JSON.parse(localStorage.getItem("loggedUser")).loginid;
   const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
   setUser(loggedUser);
   //const buyer=JSON.parse(localStorage.getItem("loggedUser"));
   const firstname=JSON.parse(localStorage.getItem("loggedUser")).firstname;
    fetch("http://localhost:8000/getUser?loginid="+loginid)
    .then(resp=>resp.json())
    .then(obj=>{
                  console.log(JSON.stringify(obj))
                   localStorage.setItem("loggedBuyer",JSON.stringify(obj))
                   setUser(obj);
    })
  },[])



    return(
        
         <div className="App">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
           
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="view_products">View Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="view_cart">View Cart</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Logout</Link>
                </li>
              </ul>
            </div>
           </nav>
            
            <h1 className='bg-danger text-white'> Welcome {user && user.firstname } </h1>
             <img width={1275} height={600} src={myImage}/>
            <Outlet/>
            
        </div>
    )
}