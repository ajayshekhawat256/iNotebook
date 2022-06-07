import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const{showAlert}=props;
    let history=useNavigate();
    const host="http://localhost:5000";
    const[credentails,setcredentials]=useState({name:"",email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const{name,email,password}=credentails;
        const response= await fetch(`${host}/api/auth/createuser`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
            // localStorage.setItem('token',json.AuthToken)
            history('/');
            showAlert("Account created successfully","success");
        }
        else{
            showAlert("Invalid credentails","danger");
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentails,[e.target.name]:e.target.value})
    }
    return (
        <div className="container mt-5">
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup