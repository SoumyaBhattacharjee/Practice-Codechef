import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Author from './components/author'
import Concept from './components/concept'
import Difficulty from './components/difficulty'
import Problem from './components/problems';
import Login from './components/login';
import Register from './components/register'
import Home from './components/home';
import Usertag from './components/usertag';
import Alltags from './components/alltags';
import Userprobs from './components/userprobs'
import { useCookies } from 'react-cookie';
import NAV from './components/nav'
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
function App(props) {
const [cookies, setCookie,removeCookie] = useCookies(['user']);

  return (
    <div className="pp">
    <NAV history={props.history} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>
    <Router>
    <Switch>
    <Route path="/" exact component={()=><Home cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/App" component={()=><App/>}/>
    <Route path="/Author" component={()=><Author cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/Concept" component={()=><Concept cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/Difficulty" component={()=><Difficulty cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/Login" component={()=><Login cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/Alltags" render={({match})=><Alltags match={match} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/Register" component={()=><Register cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/problems/:tagname" render={({match})=><Problem match={match} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    <Route path="/usertag/:tagname" render={({match})=><Usertag match={match} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
      <Route path="/userprobs/:tagname" render={({match})=><Userprobs match={match} cookies={cookies} setCookie={setCookie} removeCookie={removeCookie}/>}/>
    </Switch>
    </Router>

      </div>
  );
}

export default App;
