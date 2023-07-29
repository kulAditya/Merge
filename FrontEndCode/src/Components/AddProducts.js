import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const init = {
    productname: "",
    image: "",
    video: "",
    lastname: "",
    price: "",
    cid: 0,
    loginid: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.fld]: action.val };
      case "reset":
        return init;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const emailid = JSON.parse(localStorage.getItem("loggedUser")).emailid;
  const pwd = JSON.parse(localStorage.getItem("loggedUser")).password;
 

  const sendData = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...info,
        emailid: emailid,
        pwd: pwd,
      }),
    };

    fetch("http://localhost:8080/saveproduct", reqOptions)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error("server error");
      })
      .then((obj) => {
        const fd = new FormData();
        fd.append("file", file);
        const reqOptions1 = {
          mode: "no-cors",
          method: "POST",
          body: fd,
        };
        fetch(
          "http://localhost:8080/uploadImage/" + obj.pid,
          reqOptions1
        )
          .then((resp) => resp.json())
          .then((obj) => {
            if (obj) {
              alert("Image uploaded successfully");
              navigate("/");
            } else {
              alert(
                "Reg Successful. Image is not Updated, Try Later"
              );
              navigate("/");
            }
          });
        alert("Product added successfully..");
        navigate("/");
      })
      .catch((error) =>
        alert("Server error. Try Later" + error)
      );
  };

  return (
    <div>
      <form className="container-sm">
        <div className="col-md-6">
          <label htmlFor="productname">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productname"
            name="productname"
            placeholder="Enter Instrument Name"
            value={info.productname}
            required
            onChange={(e) =>
              dispatch({
                type: "update",
                fld: "productname",
                val: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="price">price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter price of instrument"
            value={info.price}
            required
            onChange={(e) =>
              dispatch({
                type: "update",
                fld: "price",
                val: e.target.value,
              })
            }
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            upload image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="
image"
                onChange={(e)=>setFile(e.target.files[0])} ></input> 
               </div>              
              <div className="col-md-6">
                <label htmlFor="video">Video link :</label>
                <input type="text" className="form-control" id="video" name="video" placeholder="Enter link " value={info.video} required
                onChange={(e)=>{dispatch({type:'update',fld:'video',val:e.target.value})}} />
              </div>
              
              

              <div className="col-md-6">
                <label htmlFor="cid">category:</label>
                <select className="form-select" id="cid" name="cid" placeholder="select category" 
                onChange={(e)=>{dispatch({type:'update',fld:'cid',val:e.target.value})}} >
                  <option key={0} value={0}> select category </option>
                  <option key={1} value={1}> String Instrument (guitar, violin, cello, bass, harp)</option>
                  <option key={2} value={2}> Percussion /Membranophones Instrument ( drums, xylophone, maracas, tambourine, gongs)</option>
                  <option key={3} value={3}> Wind Instrument (flute, clarinet, saxophone, trumpet, trombone) </option>
                  <option key={4} value={4}> Keyboard instruments (piano, organ, synthesizer, accordion)</option>
                  <option key={5} value={5}> Electronic instruments (electric guitar, electric bass, electronic drums, MIDI controllers)</option>
                </select>

                <br/>
              <button type="submit" className="btn btn-primary mx-2 " onClick={(e)=>{sendData(e)}}>upload Product</button>
              <button type="reset" className="btn btn-primary mx-2" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
              </div>
 
              
              
            </form>

           {/* <p>{JSON.stringify(info)}</p>*/}
        </div>
    )
}/*

<option value="">--Select Category--</option>
                        {
                            question.map((getques,index)=>(
                                <option key={index} value={getques.cat_id}>{getques.cat_name}</option>
                            ))
                        }
C:\Users\Abc\Desktop\Project\misa_project\src\Components\AddProducts.js
*/