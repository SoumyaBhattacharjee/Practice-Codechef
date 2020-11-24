import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import qs from "qs";
import { useAlert } from 'react-alert';
function Userprobs(props)
{
  let [datas,setdata]=useState([]);
  let items=[];
  const alert = useAlert();
     let history = useHistory();
  useEffect( ()=>{
    if(!props.cookies.userData)
    {
      alert.show("You have to be logged in to view this page");
      history.push("/Login");
    }
    console.log("In use Effect");
    if(props.cookies.userData){
    const fetchdata= async ()=>{
      console.log("LOL");
      console.log(props);

      let params= {
        email:props.cookies.userData.userData.email,
        tag: props.match.params.tagname,
      };
      console.log(params);
    let {data}=await axios.post("http://localhost:8000/userprobs",qs.stringify(params));
    console.log(data);
    setdata(data);

    }
    fetchdata();}

  },[])

  let [query,setquery]=useState("");
console.log("data",datas);
datas.map(i=>items.push({
  name:i.code
}))
const handleOnSearch = (string, cached) => {
  console.log("On handlesearch",string, cached);
}

const handleOnSelect = item => {
  setquery(item.name);
}

function getproblems()
{
  history.push("https://www.codechef.com/problems/"+query)
}
function getproblemsfrombuttons(event)
{
  history.push("/problems/"+event.target.value)
}

const handleOnFocus = () => {
  console.log("Focused");
}
  return (
    <div>

    <div className="ac">
    <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
              />
    <button className="btn btn-small btn-success by" onClick={getproblems}>View</button>
      </div>
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Problems&nbsp;&nbsp;</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {datas.map(i=>(
    <tr>
    <td>  {i.id}</td>
      <th scope="row"><a className="btn btn-small btn-success" href={"https://www.codechef.com/problems/"+i.code}>{i.code}</a></th>



    </tr>
  ))}

  </tbody>
</table>

    </div>


  )
}
export default Userprobs;
