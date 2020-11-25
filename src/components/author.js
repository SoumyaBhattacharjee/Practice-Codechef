import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Spinner } from 'react-bootstrap';
//  "proxy": "http://localhost:8000",
//import { browserHistory} from 'react-router';

function Author(props)
{
  let [datas,setdata]=useState([]);
  let [search,setsearch]=useState("");
   let history = useHistory();
   let [isloading,setloading]=useState(1);
   function Loading()
   {
     if(isloading)
     {
       return (<Button variant="primary" className="deep" disabled>
       <Spinner
         as="span"
         animation="border"
         size="sm"
         role="status"
         aria-hidden="true"
       />
       &nbsp;Loading...
       </Button>);
     }
     else return (<div></div>)
   }
  let items=[];
  useEffect( ()=>{
    console.log("In use Effect");
    const fetchdata= async ()=>{
    //  console.log("LOL");
    let {data}=await axios.get("https://polar-everglades-67407.herokuapp.com/public/index.php/api/key/author");
    //  console.log("Data is",sessionStorage.getItem('userData'));
    setdata(data);
    setloading(0);
    }
    fetchdata();

  },[])

  let [sortbyalpha,setsortbyalpha]=useState(0);
  let [sortbycount,setsortbycount]=useState(0);
  let [query,setquery]=useState("");

function changecount(event)
{
  console.log("HI in changecount");
  setsortbycount(sortbycount+1);
  if(sortbycount%2==0)
  {console.log("LOL");
   let datar = _.sortBy(datas, i => -i.count);
   setdata(datar);
   console.log(sortbycount);
  }
  else
  {console.log("LOL");
   let datar = _.sortBy(datas, i => i.count);
   setdata(datar);
   console.log(sortbycount);
  }
  event.preventDefault();
}
function changealpha(event)
{
  console.log("HI");
  setsortbyalpha(sortbyalpha+1);
  if(sortbyalpha%2==0)
  {console.log("LOL");
   let datar = _.sortBy(datas, i => i.tag);
   setdata(datar);
   console.log(datar);
  }
  else
  {console.log("LOL");
   let datar = _.sortBy(datas, i => i.tag).reverse();
   setdata(datar);
   console.log(sortbyalpha);
  }
  event.preventDefault();
}

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
  datas.map(i=>items.push({
    name:i.tag
  }))
    console.log(props.history);
// props.setCookie('name',"Soumya", { path: '/' });
//  console.log(props.cookies.userData);
  return (
    <div className="pp">
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
      <th scope="col">Author&nbsp;&nbsp;<button className="btn btn-small btn-outline-success" onClick={changealpha}>Sort</button></th>
      <th scope="col">Problem Count&nbsp;&nbsp;
      <button className="btn btn-small btn-outline-success" onClick={changecount}>Sort</button></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {datas.map(i=>(
    <tr>
      <th scope="row">{i.id}</th>
      <td>{i.tag}</td>
      <td>{i.count}</td>
      <td><button value={i.tag} className="btn btn-small btn-outline-success" onClick={redirects} >Problems</button></td>
    </tr>
  ))}

  </tbody>
</table>
<Loading/>
</div>
  )
}
export default Author;
