import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Difficulty(props)
{
  let [datas,setdata]=useState([]);
  let [search,setsearch]=useState("");
  let difficultytags=[{id:1,tag:'cakewalk'},{id:2,tag:'easy'},{id:3,tag:'easy-medium'},{id:4,tag:'medium'},{id:5,tag:'medium-hard'},{id:6,tag:'hard'},{id:7,tag:'challenge'}]
  let items=[];
  let history = useHistory();
  useEffect( ()=>{
  //  console.log("In use Effect");
    const fetchdata= async ()=>{
      //console.log("LOL");
    let {data}=await axios.get("https://polar-everglades-67407.herokuapp.com/public/index.php/api/key/author");
    setdata(data);
    }
    fetchdata();

  },[])
  let [sortbyalpha,setsortbyalpha]=useState(0);
  let [sortbycount,setsortbycount]=useState(0);
  let [query,setquery]=useState("");

function handleSubmit(event)
{
  history.push("/problems/"+query);
  event.preventDefault();
}
function redirects(event)
{
  let tag=event.target.value;
  event.preventDefault();
  history.push("/problems/"+tag);
}

  const handleOnSearch = (string, cached) => {
    console.log("On handlesearch",string, cached);
  }

  const handleOnSelect = item => {
    setquery(item.name);
  }

  const handleOnFocus = () => {
    console.log("Focused");
  }
  difficultytags.map(i=>items.push({
    name:i.tag
  }))
//  console.log(items);
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <div className="ac">
    <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
              />
    </div>
    <button type="submit" name="button" class="btn btn-success by">Search</button>
    </form>
    <table class="table table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Dfficulty</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {difficultytags.map(i=>(
      <tr>
        <th scope="row">{i.id}</th>
        <td>{i.tag}</td>
        <td><button value={i.tag} className="btn btn-small btn-outline-success" onClick={redirects} >Problems</button></td>
      </tr>
    ))}
  </tbody>
  </table>
</div>
  )
}
export default Difficulty;
