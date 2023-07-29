import { useReducer } from "react";

export default function UserReg(){
    
  const init={
        emailid:{value:"",hasError:true,touched:false,error:""},
        password:{value:"",hasError:true,touched:false,error:""},
        firstname:{value:"",hasError:true,touched:false,error:""},
        lastname:{value:"",hasError:true,touched:false,error:""},
        contactno:{value:"",hasError:true,touched:false,error:""},
        address:{value:"",hasError:true,touched:false,error:""},
        role_id:{value:0,hasError:true,touched:false,error:""},
        isFormValid:false

      }

      const validateData=(fieldName,value) =>{
        console.log(fieldName+" : "+value)
        let hasError=false;
        let error="";
        switch (fieldName){
          case "emailid":
          let emailRegix=/^([_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{1,6}))?$/;
          if(!emailRegix.test(value))
          {
            hasError=true;
            error="Invalid Email"
          }
          break;
          case "password":
          let passwordRegix=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if(!passwordRegix.test(value))
          {
            hasError=true;
            error="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
          }
          break;

          case "firstname":
          let firstnameRegix=/^[A-Z][a-z]{1,23}$/ ;
          if(!firstnameRegix.test(value))
          {
            hasError=true;
            error=" Invalid Firstname "
          }
          break;

          case "lastname":
          let lastnameRegix=/^[A-Z][a-z]{1,23}$/ ;
          if(!lastnameRegix.test(value))
          {
            hasError=true;
            error=" Invalid Lastname "
          }
          break;
          case "contactno":
          let contactnoRegix=/^[0-9]{8,10}$/ ;
          if(!contactnoRegix.test(value))
          {
            hasError=true;
            error=" Invalid contactno "
          }
          break;

          case "address":
          let addressRegix=/^[#.0-9a-zA-Z\s,-]+$/ ;
          if(!addressRegix.test(value))
          {
            hasError=true;
            error=" Invalid Address. correct format- e.g.North Street, Chennai - 11 "
          }
          break;

          default:
            break;

        }
        return {hasError,error}

      }
      
      const onInputchange=(fieldName,value,dispatch)=>{
        const{hasError,error}=validateData(fieldName,value);
        let isFormValid=true;
        for(const key in reginfo)
        {
          let item=reginfo[key];
          if(item.hasError)
          {
            isFormValid=false;
            break;

          }
        }

        dispatch({type:'update',data:{fieldName,value,hasError,error,touched:true,isFormValid}})
      }

      const onFocusOut=(fieldName,value)=>{
        const{hasError,error}=validateData(fieldName,value);
        let isFormValid=true
        for(const key in reginfo)
        {
          const item =reginfo[key]
          if(key ===fieldName && item.hasError)
          {
             isFormValid=false
             break;
          }
          else if(key!==fieldName && item.hasError)
          {
            isFormValid=false
            break;
          }
        }
        dispatch({
          type:"update",
          data:{fieldName,value,hasError,error,touched:true,isFormValid}

        })
      }

      const reducer=(state,action) => {
          console.log("in dispatch")
          switch(action.type)
          {
            case 'update':
              const {fieldName,value,hasError,error,touched,isFormValid} =action.data;

              return {...state,[fieldName]:{value,hasError,error,touched},             
              isFormValid }
              case 'reset':
                return init;

                default:
          }
    
      }
    
      const[reginfo,dispatch]=useReducer(reducer,init);

      const sendData=(e) => {

        e.preventDefault();
         alert("Registration Successful")
        const reqOptions={
         
         method:'POST',
         headers: {'content-type':'application/json'},
         body:JSON.stringify({emailid: reginfo.emailid.value,password:reginfo.password.value,firstname:reginfo.firstname.value,lastname:reginfo.lastname.value,contactno:reginfo.contactno.value,address:reginfo.address.value,role_id:reginfo.role_id.value })
     
        }
        fetch("http://localhost:8080/regUser",reqOptions)
        .then(resp=>console.log(resp))
      }

      

    return(
        <div>
            <form className="container-sm" >
              <div className="form-group">
                <label htmlFor="emailid">User ID/Email ID:</label>
                <input type="text" className="form-control" id="emailid" name="emailid" placeholder="Enter UserID/Email ID" value={reginfo.emailid.value} 
                 onChange={(e)=>{onInputchange("emailid",e.target.value,dispatch)}}
                 onBlur={(e)=>{onFocusOut("emailid",e.target.value,dispatch)}}/>
                 <p style={{display:reginfo.emailid.touched && reginfo.emailid.hasError ? "block" :"none",color:"red"}}>{reginfo.emailid.error}</p>
              </div>
              <br/>
              
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" value={reginfo.password.value} 
                onChange={(e)=>{onInputchange("password",e.target.value,dispatch)}}
                onBlur={(e)=>{onFocusOut("password",e.target.value,dispatch)}}/>
                <p style={{display:reginfo.password.touched && reginfo.password.hasError ? "block" :"none",color:"red"}}>{reginfo.password.error}</p>
              </div>
              <br/>
              
              <div className="form-group">
                <label htmlFor="firstname">First Name:</label>
                <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Enter First Name" value={reginfo.firstname.value} 
                onChange={(e)=>{onInputchange("firstname",e.target.value,dispatch)}}
                onBlur={(e)=>{onFocusOut("firstname",e.target.value,dispatch)}} />
                <p style={{display:reginfo.firstname.touched && reginfo.firstname.hasError ? "block" :"none",color:"red"}}>{reginfo.firstname.error}</p>
              </div>
              <br/>
              
              <div className="form-group">
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Enter Last Name" value={reginfo.lastname.value} 
               onChange={(e)=>{onInputchange("lastname",e.target.value,dispatch)}}
               onBlur={(e)=>{onFocusOut("lastname",e.target.value,dispatch)}}/>
               <p style={{display:reginfo.lastname.touched && reginfo.lastname.hasError ? "block" :"none",color:"red"}}>{reginfo.lastname.error}</p>
              </div>
              <br/>
              
              <div className="form-group">
                <label htmlFor="contactno">Contact Number:</label>
                <input type="number" className="form-control" id="contactno" name="contactno" placeholder="Enter Contact number" value={reginfo.contactno.value} 
                onChange={(e)=>{onInputchange("contactno",e.target.value,dispatch)}}
                onBlur={(e)=>{onFocusOut("contactno",e.target.value,dispatch)}}/>
                <p style={{display:reginfo.contactno.touched && reginfo.contactno.hasError ? "block" :"none",color:"red"}}>{reginfo.contactno.error}</p>
              </div>
               <br/>
               

              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" className="form-control" id="address" name="address" placeholder="Enter Address...e.g.North Street, Chennai - 11" value={reginfo.address.value} 
               onChange={(e)=>{onInputchange("address",e.target.value,dispatch)}}
               onBlur={(e)=>{onFocusOut("address",e.target.value,dispatch)}}/>
               <p style={{display:reginfo.address.touched && reginfo.address.hasError ? "block" :"none",color:"red"}}>{reginfo.address.error}</p>
              </div>
              <br/>
               

              <div className="form-group">
                <label htmlFor="role_id">Role:</label>
                <select className="form-select" id="role_id" name="role_id" placeholder="Enter Role" 
               onChange={(e)=>{onInputchange("role_id",e.target.value,dispatch)}}
               onBlur={(e)=>{onFocusOut("role_id",e.target.value,dispatch)}} >
                  <option key={0} value={0}> Select Role </option>
                  <option key={1} value={1}> User </option>
                  <option key={2} value={2}> Seller </option>

                </select>
              </div>
 
              
              <br/>
              <button type="submit" className="btn btn-primary  mx-2"  onClick={(e)=>{sendData(e)}}>Register</button>
              <button type="reset" className="btn btn-secondary  mx-2 " onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
            </form>

            {/*<p>{JSON.stringify(reginfo)}</p>*/}
        </div>
    )
}