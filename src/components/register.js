import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import qs from "qs";
import FlashMessage from 'react-flash-message'
function Register(props)
{
  let [temp,settemp]=useState("");
  let [post,setpost]=useState();
  let [m,setm]=useState("");
     let history = useHistory();
  function msg(m)
  {
    return(
      <FlashMessage duration={5000}>
        <strong>{m}</strong>
      </FlashMessage>
    )
  };
  function handleChange(event)
  {
    let {name,value}=event.target;

    setpost(prev=>{
    //  console.log(post);
      return {
      ...prev,
      [name]: value
    }})
  }
function handlesubmit(event)
  {
    let params= {
      email: post.email,
      password: post.password
    };
    console.log(post);
  axios.post("https://polar-everglades-67407.herokuapp.com/public/index.php/register",qs.stringify(params)).then((res)=>{
  let {data}=res;
  console.log("Data is",data);
setm(data);
})
    .catch((err)=>console.log("In error",err))
    setpost({});
    event.preventDefault();
  }
  console.log("Temp is",temp);
  return (
<div class="container mt-5 sg">
  <h1 className="loghead">Register</h1>

  <div class="row sg">
    <div class="col-sm-8 sg">
    <form class="form-group "  onSubmit={handlesubmit} >
    <label for="Name">Email</label><br />
    <textarea name="email" rows="1" cols="30" placeholder="Enter email ..." class="form-control" onChange={handleChange}></textarea><br/>
    <label for="password">Password</label><br />
    <input name="password" type="password" rows="1" cols="30" placeholder="Enter password ..." class="form-control" onChange={handleChange}/><br/>
      <button type="submit" class="btn btn-success" >Register</button>
    </form>

      <strong>{m}</strong>

    </div>
  </div>
    </div>

  );
  }
export default Register;
