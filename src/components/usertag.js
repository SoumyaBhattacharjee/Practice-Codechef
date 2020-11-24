import axios from "axios";
import {useState,useEffect} from "react";
import _ from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav,Form,NavDropdown ,FormControl,Button} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route,Link,useHistory} from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import qs from "qs";
function Usertag(props)
{
  let [datas,setdata]=useState([]);
  let items=[];
  let [mytags,setmytags]=useState([]);
  let [tag,settag]=useState("");
     let history = useHistory();
  useEffect( ()=>{
    console.log("In use Effect");
    const fetchdata= async ()=>{
      console.log("LOL");
      console.log(props);

    let {data}=await axios.get("https://polar-everglades-67407.herokuapp.com/public/index.php/api/tagofproblems/"+props.match.params.tagname);
    console.log(data);
    setdata(data);
    if(props.cookies.userData)
    {
      console.log("In userData usertag");
      let params= {
        email: props.cookies.userData.userData.email,
        code: props.match.params.tagname,
        tag:tag
      };
        axios.post("https://polar-everglades-67407.herokuapp.com/public/index.php/usertags",qs.stringify(params)).then((res)=>{
        let {data}=res;
        setmytags(data);
        console.log(data);});
    }
    }
    fetchdata();

  },[])

  let [query,setquery]=useState("");

datas.map(i=>items.push({
  name:i.tag
}))
console.log("MYTAGS IS",mytags);

const handleOnSearch = (string, cached) => {
  console.log("On handlesearch",string, cached);
}

const handleOnSelect = item => {
  setquery(item.name);
}
function handleChange(event)
{
  settag(event.target.value);
}
function handlesubmit(event)
{
  console.log(props.cookies.userData.userData);

  let params= {
    email:props.cookies.userData.userData.email,
    code: props.match.params.tagname,
    tag: tag
  };
  axios.post("https://polar-everglades-67407.herokuapp.com/public/index.php/api/tagofproblems",qs.stringify(params)).then((res)=>{
  let {data}=res;

console.log(data);
})
  .catch((err)=>console.log("In error",err));
  settag("");

  console.log(params);

}
function usertags(event)
{
  let problem=event.target.value;
  event.preventDefault();
  console.log(props.cookies.userData);
  history.push("https://www.codechef.com/problems/"+problem);
}
function getproblems()
{
  history.push("/problems/"+query)
}
function getproblemsfrombuttons(event)
{
  history.push("/problems/"+event.target.value)
}
function getto(event)
{
  history.push("/userprobs/"+event.target.value);
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

      {props.cookies.userData && <form class="form-group ac "  onSubmit={handlesubmit} >
      <label for="Tag" className="he">Add Tag</label><br />
      <textarea name="tag" rows="1" cols="30" placeholder="Enter tag ..." class="form-control" onChange={handleChange}></textarea><br/>
      <button type="submit" class="btn btn-dark">Add</button>&nbsp;&nbsp;&nbsp;
      </form>
    }
    <div className="probhead">
      <a className="btn btn-small btn-success" href={"https://www.codechef.com/problems/"+props.match.params.tagname}>{props.match.params.tagname}</a>
      </div>
  {datas.map(i=>
    <span><button className="btn btn-warning" value={i.tag} onClick={getproblemsfrombuttons}>{i.tag}</button>&nbsp;&nbsp;</span>
  )}
  {
    props.cookies.userData&&<div>
  <h4 className="he">Tags added by you :</h4>
  {mytags&&mytags.map(i=>
    <span><button className="btn btn-warning" value={i.tag} onClick={getto} >{i.tag}</button>&nbsp;&nbsp;</span>
  )}
  </div>
}
</div>
  )
}
export default Usertag;
