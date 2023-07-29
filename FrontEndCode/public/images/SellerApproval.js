import { useReducer, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "./slice";
import Admin from "./AdminHome";
import { Link, Route ,Routes} from 'react-router-dom';
import axios from "axios";   //npm install axios  (command to install axios)
export default function SellerApproval()
{
    const navigate=useNavigate();
   const reduxAction = useDispatch();
    
  

    const [login,setLogin]=useState([])
    useEffect(()=>{
        getSeller();
    },[])

    function getSeller()
    {
        fetch("http://localhost:8080/getallseller")
        .then((result)=>{result.json()
             .then((resp)=>{
                setLogin(resp)
                setName(resp[0].firstname)
                setEmail(resp[0].emailid)
                setStatus(resp[0].status)
            })
        })
        
    }
   

    function changeStatusFalse(loginid)
    {
        alert("Status changed :Deactivated")
        fetch("http://localhost:8080/setStatusZero?loginid="+loginid,{
            mode: 'no-cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            
        
        }).then((result)=>{ result.json().then((resp)=>{
                console.log(resp);
                getSeller();
            })
        })
        
    }

    function changeStatusTrue(loginid)
    {
        alert("Status changed :Activated")
        fetch("http://localhost:8080/setStatusOne?loginid="+loginid,{
            mode: 'no-cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            
        
        }).then((result)=>{ result.json().then((resp)=>{
                console.log(resp);
                getSeller();
            })
        })
        
    }


    const[firstname,setName] = useState("");
    const[emailid,setEmail] = useState("");
    const[status,setStatus] = useState("");

    function selectUser(loginid)
    {
        console.warn(login[loginid-1])
        setName(login[loginid-1].firstname)
        setEmail(login[loginid-1].emailid)
        setStatus(login[loginid-1].status)
    }

 return(
    <div>
       <table className = "table table-striped">
                <thead>
                    <tr>
                        <th> Login Id</th>
                        <th> First Name</th>
                        <th> Last Name</th>
                        <th> Email Id</th>
                        <th>Status</th>
                        </tr>

                </thead>
                <tbody>
                    {
                        login.map(
                                login =>
                                <tr key = {login.loginid}>
                                    <td> {login.loginid }</td>
                                    <td> {login.firstname }</td>
                                    <td> {login.lastname }</td>    
                                    <td> {login.emailid }</td>
                                    <td> {login.status.toString()}</td>
                                    <td>
                                    <button className="btn btn-danger" disabled={login.status === 0} onClick={() => changeStatusFalse(login.loginid)}>Deactivate</button>
                                    </td>
                                    <td><button className="btn btn-primary" disabled={login.status === 1} onClick={() => changeStatusTrue(login.loginid)}>Activate</button></td>
                                   


                                </tr>

                        )
                    }

                </tbody>
            </table>
           
           
    </div>

   )
  
}
