import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import qs from "qs";
import { useAlert } from 'react-alert';
function Login(props)
{
    let [post,setpost]=useState();
       let history = useHistory();
       let [m,setm]=useState("");
       const alert = useAlert();
       useEffect( ()=>{
         if(props.cookies.userData)
         {alert.show('You are already logged in')
         history.push("/");}
       },[])
  function regis(event)
  {
    history.push("/Register");
    event.preventDefault();
  }
  function handleChange(event)
  {
    let {name,value}=event.target;
    setm("");
    setpost(prev=>{
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
  axios.post("https://polar-everglades-67407.herokuapp.com/public/index.php/login",qs.stringify(params)).then((res)=>{
  let {data}=res;

  if(data.userData){
    setm("");
    props.setCookie('userData',JSON.stringify(data), { path: '/' });
    history.push("/");
}
else setm("Wrong email or password");
  })
    .catch((err)=>console.log("In error",err))
    setpost({});
    event.preventDefault();
  }
  return (
<div class="container mt-5 sg">
  <h1 className="loghead">Login</h1>

  <div class="row sg">
    <div class="col-sm-8 sg">
    <form class="form-group "  onSubmit={handlesubmit} >
    <label for="Name">Email</label><br />
    <textarea name="email" rows="1" cols="30" placeholder="Enter email ..." class="form-control" onChange={handleChange}></textarea><br/>
    <label for="password">Password</label><br />
      <input name="password" type="password" rows="1" cols="30" placeholder="Enter password ..." class="form-control" onChange={handleChange}/><br/>
    <button type="submit" class="btn btn-success">Login</button>&nbsp;&nbsp;&nbsp;
      <button type="submit" class="btn btn-warning" onClick={regis}>Register</button>

    </form>
  <h4>{m}</h4>
    </div>
  </div>
    </div>

  );
  }
export default Login;
