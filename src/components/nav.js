import React,{useState} from 'react';

import App from "../App.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function NAV(props)
{
function lol()
{
props.removeCookie("userData");
};
  return (<div className="hgds">
  <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/" >Practice-Codechef</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto row">

        <Nav.Link href="/" className="c" >Home </Nav.Link>
        <Nav.Link href="/Author" className="c">Author</Nav.Link>
        <Nav.Link href="/Concept" className="c">Concept</Nav.Link>
        <Nav.Link href="/Difficulty" className="c">Difficulty</Nav.Link>
        {props.cookies.userData&&<Nav.Link href="/Alltags" className="c">{props.cookies.userData.userData.email}</Nav.Link>}
        {!props.cookies.userData && <Nav.Link href="/Login" className="c">Login</Nav.Link>}
        {props.cookies.userData && <Nav.Link href="/" onClick={lol} className="c">Logout</Nav.Link>}
      </Nav>

    </Navbar.Collapse>
  </Navbar>
</div>);
}
export default NAV;
