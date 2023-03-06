import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const SignUp=()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [])

    const keyUpdateProduct = (event) => {
        if(event.key === 'Enter'){
            collectData();
        }
    }
    const collectData = async()=>{
        if(!name || !email || !password) {
            setError(true);
            return false;
        }
            let result = await axios.post('http://localhost:5000/register',JSON.stringify({name, email, password}), {
            // method:'post',
            // body:JSON.stringify({name, email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        // result = await result.json();
        localStorage.setItem("user", JSON.stringify(result.data.result))
        localStorage.setItem('token', JSON.stringify(result.data.auth))
        navigate('/');
     
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className ='inputBox' type="text" placeholder="Enter Name" onKeyDown={keyUpdateProduct}
            value={name} onChange={(e)=>setName(e.target.value)}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input className ='inputBox' type="text" placeholder="Enter Email" onKeyDown={keyUpdateProduct}
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            {error && !email && <span className='invalid-input'>Enter valid email</span>}
            <input className ='inputBox' type="password" placeholder="Enter password" onKeyDown={keyUpdateProduct}
            value={password} onChange={(e)=>setPassword(e.target.value)}
            />
            {error && !password && <span className='invalid-input'>Enter valid password</span>}
            <button onClick= {collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;