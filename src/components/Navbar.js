import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation();
    let history=useNavigate();
    const handleClick=()=>{
        localStorage.removeItem('token');
        props.showAlert("Logged out successfully","success");
        history('/login');
    }
    const handleClickk=()=>{
        if(!localStorage.getItem('token')){
            props.showAlert("LOG IN TO CONTINUE","danger");

        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about" onClick={handleClickk}>MyNotes</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2"  to="/Signup" role="button">Signup</Link>
                        </form>: <button onClick={handleClick} className="btn btn-primary">Logout</button> }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar