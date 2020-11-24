
import axios from "axios";
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { useAlert } from 'react-alert';
function Home() {
  const alert = useAlert();
  let [guide,setguide]=useState(0);
function lol()
{
  setguide(guide+1);
}
function Isguide(){

if(guide%2) {
  alert.show("Scroll down to see the user guideline")
  return (<div class="guideline" onClick={lol}>
<ul>
<li className="hs"><span><b>Author</b> &nbsp;&nbsp;To view problem author name and their problem counts</span></li>
<li className="hs"><span><b>Concept</b> &nbsp;&nbsp;To view conceptwise problem tags</span></li>
<li className="hs"><span><b>Difficulty</b> &nbsp;&nbsp;To view difficulty wise problem tags</span></li>
<li className="hs"><span><b>Problems</b> &nbsp;&nbsp;Problems section in the above three will lead you to the problems of the specified tag (if problems of the tag is fetched)</span></li>
<li className="hs"><span><b>View</b> &nbsp;&nbsp;View tag in the problems section would lead you to the tags of the selected problem and if the user is <b>logged in</b> he/she can add his/her own tag</span></li>
<li className="hs"><span><b>Logged in user</b> &nbsp;&nbsp;can view his added tags by clicking his email id in the navbar</span></li>
<li className="hs"><span><b>Sort</b> &nbsp;&nbsp;You can sort as you wish by clicking the buttons in the table header </span></li>
<li className="hs"><span><b>Autocomplete search bar</b> &nbsp;&nbsp;is used to search tags on author,difficulty and concept section and problems in problem section </span></li>
<li className="hs"><span><b>Login and register</b> &nbsp;&nbsp;User can login by going to the login link in the navbar , new user can also register by clicking the register button in the login section</span></li>
</ul>
</div>)}
else return(<p></p>)
}
  return (
    <div className="pp">

      <img src="https://codechefvit.com/assets/images/logos/cclogo.png" className="about"></img>
      <div > <h3  className="btn btn-primary deep" onClick={lol}>User Guideline</h3>
        <Isguide/>
        </div>
      </div>
  );
}

export default Home;
