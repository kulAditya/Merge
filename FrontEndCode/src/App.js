
import './App.css';
//import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';



//import ApproveSeller from './Components/ApproveSeller';

import React, { useState } from "react";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";


function App() {
const mystate=useSelector((state)=>state.logged);

  return (
    <div className="App">
      <div style={{display:mystate.loggedIn ? "none":"block"}}>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/frontpage">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="userreg"> Registration</Link>
                </li>
                <li className="nav-item">
                 
                </li>
              </ul>
             
            </div>
           </nav>
       <h1 className="bg-dark text-white">Home Health care  App</h1>
      
       <h3 className="bg-danger text-white">For Senior citizens only</h3>
         
      </div>
      <Routes>
    
      <Route path="/userreg" element={<Registration/>}/>
     
    </Routes>
    </div>
  );
}

export default App;


