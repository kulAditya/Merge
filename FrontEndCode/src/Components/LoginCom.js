import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./slice";

export default function LoginCom(){
 
  const init={
    emailid:"",
    pwd:""
  }

  const reducer=(state,action) => {
      switch(action.type)
      {
        case 'update':
          return{...state,[action.fld]:action.val}
          case 'reset':
            return init;
      }

  }

  const[info,dispatch]=useReducer(reducer,init);
  const [msg,setMsg]=useState("");
  const navigate=useNavigate();
  const reduxAction=useDispatch();

  const sendData=(e)=>{
   e.preventDefault();

   const reqOptions={
    
    method:'POST',
    headers: {'content-type':'application/json'},
    body:JSON.stringify(info)

   }
   fetch("http://localhost:8080/chkLogin",reqOptions)
   .then(resp=>{if(resp.ok)
                 return resp.text();

                 else 
                 throw new Error("Server Error");
               }
               )
   .then(text=>text.length ? JSON.parse(text):{})
   .then(obj=>{
            if(Object.keys(obj).length === 0)
            {
              setMsg(<span style={{ color: 'red' }}>Wrong Emailid/Password</span>);
            }
            else
            {
              reduxAction(login())
              localStorage.setItem("loggedUser",JSON.stringify(obj));
                if(obj.status===0)
                {
                  alert("Request has not been approved")
                  navigate('/')
                }
                else
                {
                  if(obj.role_id.role_id ===1)
                  {
                    navigate("/user_home");
                  }
                  else if(obj.role_id.role_id ===2)
                  {
                    navigate("/seller_home");
                  }
                  else if(obj.role_id.role_id ===3)
                  {
                        navigate("/admin_home");
                  }

                }
            }
   })
   .catch((error)=>alert("Server error.Try after some time."));
  }


    return(
 
        <div>
           <h4>Login </h4>
            <form className="container-sm">
              <div className="form-group">
                <label htmlFor="emailid">User ID/Email ID:</label>
                <input type="text" className="form-control" id="emailid" name="emailid" placeholder="Enter UserID/Email ID" value={info.emailid} 
                required onChange={(e)=>{dispatch({type:'update',fld:'emailid',val:e.target.value})}}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" value={info.password} required
                onChange={(e)=>{dispatch({type:'update',fld:'pwd',val:e.target.value})}} />
              </div>
              <br/>
              <button type="submit" className="btn btn-primary mx-2" onClick={(e)=>{sendData(e)}}>Login</button>
              <button type="reset" className="btn btn-secondary mx-2" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
            </form>
            {/*<p> {JSON.stringify(info)} </p>*/}
            <p>{msg}</p>
        </div>
    )
}