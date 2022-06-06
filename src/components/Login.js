
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const Login = (props) => { 
    const{showAlert}=props;
    const history = useNavigate();
    const host="http://localhost:5000";
    const [credentials,setcredentials]=useState({email:"",password:""});

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'

            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json)
        if(json.success){
            localStorage.setItem('token',json.authtoken)
            history("/");
            showAlert("Logged in successfully","success");
        }
        else{
            showAlert("Invalid credentails","danger");
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className="mt-5">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" name="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login