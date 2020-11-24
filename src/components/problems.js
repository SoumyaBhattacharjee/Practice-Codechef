import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useAlert } from 'react-alert';
function Problem(props)
{
  let [datas,setdata]=useState([]);
  let items=[];
     let history = useHistory();
      const alert = useAlert();
  useEffect( ()=>{
    console.log("In use Effect");
    const fetchdata= async ()=>{
      console.log("LOL");
      console.log(props);
    let {data}=await axios.get("https://polar-everglades-67407.herokuapp.com/public/index.php/api/problems/"+props.match.params.tagname);
    if(!data.length)
    {
      alert.show("Sorry problems of this tag has not been fetched");
      history.goBack();
    }
    setdata(data);
    }
    fetchdata();

  },[])
  let [sortbysolved,setsortbysolved]=useState(0);
  let [sortbyattempted,setsortbyattempted]=useState(0);
  let [query,setquery]=useState("");
function changesolved(event)
{
  console.log("HI in changecount");
  setsortbysolved(sortbysolved+1);
  if(sortbysolved%2==0)
  {console.log("LOL");
   let datar = _.sortBy(datas, i => Number(i.solved));
   setdata(datar);
   console.log(sortbysolved);
  }
  else
  {console.log("LOL");
   let datar = _.sortBy(datas, i => Number(i.solved)).reverse();
   setdata(datar);
   console.log(sortbysolved);
  }
  event.preventDefault();
}
function changeattempted(event)
{
  console.log("HI");
  setsortbyattempted(sortbyattempted+1);
  if(sortbyattempted%2==0)
  {console.log("LOL");
   let datar = _.sortBy(datas, i =>Number(i.attempted));
   setdata(datar);
   console.log(datar);
  }
  else
  {console.log("LOL in changeattempted");
   let datar = _.sortBy(datas, i => Number(i.attempted)).reverse();
   setdata(datar);
   console.log(datar);
  }
  event.preventDefault();
}

function view(event)
{
  //https://www.codechef.com/problems/SWPERMS
  let problem=event.target.value;
   history.push("/usertag/"+problem);
   event.preventDefault();
}
datas.map(i=>items.push({
  name:i.code
}))
const handleOnSearch = (string, cached) => {
  console.log("On handlesearch",string, cached);
}

const handleOnSelect = item => {
  setquery(item.name);
}
function usertags(event)
{
  let problem=event.target.value;
  console.log(props.cookies.userData,problem);
 history.push("/usertag/"+problem);
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
    <a className="btn btn-small btn-success by" href={"https://www.codechef.com/problems/"+query}>View</a>
    </div>
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Attempted&nbsp;&nbsp;<button className="btn btn-small btn-outline-success" onClick={changeattempted}>Sort</button></th>
      <th scope="col">Solved&nbsp;&nbsp;<button className="btn btn-small btn-outline-success" onClick={changesolved}>Sort</button></th>
      <th scope="col">Partially Solved&nbsp;&nbsp;</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {datas.map(i=>(
    <tr>
      <th scope="row">{i.code}</th>
      <td>{i.attempted}</td>
      <td>{i.solved}</td>
      <td>{i.partsolved}</td>
    <td><button class="btn btn-small btn-outline-warning" value={i.code} onClick={usertags}>View Tag</button></td>
      <td><a className="btn btn-small btn-outline-success" href={"https://www.codechef.com/problems/"+i.code}>View</a></td>
    </tr>
  ))}

  </tbody>
</table>
</div>
  )
}
export default Problem;
