import React from 'react'
import "../App.css"
import { MdClose} from "react-icons/md";
const FormTable = ({handleSubmit,handelOnChange,handleClose,rest}) => {
  return (
    <div className="addContainer">

              <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={handleClose}><MdClose/></div>

                <label htmlFor="name" >Name :</label>
                <input type="text" id="name" name="name" onChange={handelOnChange} value={rest.name}></input>
              
                <label htmlFor="email">Email :</label>
                <input type="email" id="email" name="email" onChange={handelOnChange} value={rest.email}></input>

                <label htmlFor="mobile">Mobile :</label>
                <input type="number" id="mobile" name="mobile" onChange={handelOnChange} value={rest.moblie}></input>
                <button className="btn">Submit</button>
              </form>

            </div>
  )
}

export default FormTable
