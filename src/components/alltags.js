import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import qs from "qs";
import { Spinner } from 'react-bootstrap';
import { useAlert } from 'react-alert';
function Alltags(props)
{
  let [datas,setdata]=useState([]);
  let items=[];
  const alert = useAlert();
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
        code: props.match.params.tagname,
      };
    let {data}=await axios.post("https://polar-everglades-67407.herokuapp.com/public/index.php/getalltags",qs.stringify(params));
    console.log(data);
    setdata(data);
        setloading(0);
    }
    fetchdata();}

  },[])

  let [query,setquery]=useState("");

datas.map(i=>i.tag.map(j=>
  items.push({
  name:j
})));
const handleOnSearch = (string, cached) => {
  console.log("On handlesearch",string, cached);
}

const handleOnSelect = item => {
  setquery(item.name);
}

function getproblems()
{
  history.push("/userprobs/"+query)
}
function getproblemsfrombuttons(event)
{
  history.push("/problems/"+event.target.value)
}

const handleOnFocus = () => {
  console.log("Focused");
}
function getto(event)
{
  history.push("/userprobs/"+event.target.value);
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
    <button className="btn btn-small btn-success by" onClick={getproblems}>Search Tags</button>
      </div>
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Code</th>
      <th scope="col">Added tags&nbsp;&nbsp;</th>
    </tr>
  </thead>
  <tbody>
  {datas.map(i=>(
    <tr>
      <th scope="row"><a className="btn btn-small btn-success" href={"https://www.codechef.com/problems/"+i.code}>{i.code}</a></th>
      <td>  {i.tag.map(j=>
          <span><button className="btn btn-warning" value={j} onClick={getto} >{j}</button>&nbsp;&nbsp;</span>
        )}</td>


    </tr>
  ))}

  </tbody>
</table>
<Loading/>
    </div>


  )
}
export default Alltags;
