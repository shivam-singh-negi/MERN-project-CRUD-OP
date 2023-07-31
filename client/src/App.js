import './App.css';
import { MdClose} from "react-icons/md";
import {useState,useEffect} from "react";
import axios from 'axios';
import FormTable from "./components/FormTable.js"
axios.defaults.baseURL="http://localhost:8080/"

function App() {

const handleSubmit= async(e)=>{
  e.preventDefault()
  const data=await axios.post("/create",formData);
  console.log(data)
  if(data.data.success){
    setAddSection(false);
    getFetchData();
    alert(data.data.message)
  }
  
}


const [addSection,setAddSection]  = useState(false);
const [formData,setFromData]=useState({
  name:"",
  email:"",mobile:"",
})
const [dataList,setDataList]=useState([])
const handelOnChange=(e)=>{
  const {value,name}=e.target
  setFromData((preve)=>{
    return {...preve,[name]:value}
  } )
}


const getFetchData=async()=>{
  const data=await axios.get("/");
  console.log(data)
  if(data.data.success){
    setDataList(data.data.data)
  }

}
useEffect(() => {
 getFetchData()
}, []);



const handleDelete=async(id)=>{
  const data=await axios.delete("/remove/"+id)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)

  }
  
  }
const [editSection,setEditSection]=useState(false)
 
const [formDataEdit,setFromDataEdit]=useState({
  name:"",
  email:"",mobile:"",_id:""
})

const handleUpdate=async(e)=>{
e.preventDefault();
const data=await axios.put("/update",formDataEdit)
console.log(data)
if(data.data.success){
  getFetchData()
  alert(data.data.message)

}

}
const handelEditOnChange= async(e)=>{
  console.log(e.target)
  const {value,name}=e.target
  setFromDataEdit((preve)=>{
    return {...preve,[name]:value}
  } )
}

const handleEdit=async(el)=>{
  setFromDataEdit(el);
  setEditSection(true)


}
const heading="People record Keeping Applicaiton"

return (
  <>
  <div><h1>{heading}</h1></div>
  <div className="container">
      <button className="btn btn-add" onClick={()=>setAddSection(true)}>ADD</button>
      {
        addSection &&(
           <FormTable 
           handleSubmit={handleSubmit}
           handelOnChange={handelOnChange}
           handleClose={()=>setAddSection(false)}
           rest={formData}
           />

        )
      }
      {
        editSection &&
        (<FormTable 
        handleSubmit={handleUpdate}
        handelOnChange={handelEditOnChange}
        handleClose={()=>setEditSection(false)}
        rest={formDataEdit}
        />)
      }
      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th> Name</th>
              <th> Email</th>
              <th> Mobile</th>
              <th>
               Operations
              </th>
            </tr>
          </thead>
          <tbody>
              {dataList[0]? (
                dataList.map((el)=>{
                return(
                     <tr>
                     <td>{el.name}</td>
                     <td>{el.email}</td>
                     <td>{el.mobile}</td>
                     <td>   <button className="btn btn-edit" onClick={()=>handleEdit(el)}>Edit</button>
                <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button></td>
                     </tr>
                     
                   )   })):
                   (<p style={{textAlign:"center"}}>No Data present</p>)
                }

          </tbody>

        </table>



      </div>







    
    </div>
   </>
  );
}

export default App;
