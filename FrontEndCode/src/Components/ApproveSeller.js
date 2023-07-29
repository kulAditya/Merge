import { useEffect, useReducer, useState } from "react"



export default function ApproveSeller(){

    const[seller,setSeller]=useState([])

    console.log(JSON.stringify(seller));
    useEffect(() => {
        fetch('http://localhost:8080/approveseller')
          .then(response => response.json())
          .then(obj => setSeller(obj));
      }, []);

      const approve = (loginid) => {
        console.log(loginid)
        fetch("http://localhost:8080/updateSeller?loginid=" + loginid)
          .then(resp => resp.json())
          .then(obj => {
            console.log(JSON.stringify(obj))
            if (obj) {
              alert("Updation done")
              //nav("/admin_home/approveTour")
             // window.location.reload();
            }
            else
              alert("Updation failed")
    
          })
      }

    return(

        <div>
    <table border={1}>
      <thead>
        <tr>
        <th  width="200" hight="400">Seller Id</th>
          <th  width="200" hight="400">Seller name</th>
          <th width="200" hight="400">Email Id</th>
          <th width="200" hight="400">Contact No</th>
          <th width="200" hight="400">Address</th>
          <th colSpan={2} width="200" hight="400">Approve/Reject</th>
        </tr>
      </thead>
      <tbody>

      {seller.map(s => (
          <tr>
            <td>{s.loginid}</td>
            <td>{s.firstname}</td>
            <td>{s.emailid}</td>
            <td>{s.contactno}</td>
            <td>{s.address}</td>
          
            <td><button className='btn btn-primary  mx-2' onClick={()=>{approve(s.loginid)}}>Approve</button></td>
            <td><button className='btn btn-danger  mx-2' onClick={()=>{}}>Reject</button></td>
          </tr>
        ))}
      </tbody>
    </table>
     

        </div>
    )
}