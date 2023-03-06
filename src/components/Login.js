import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login =()=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [])

    const handleKeyPress = (event) => {
        if(event.code === 'Enter'){
            handleLogin();
        }
    }

    const handleLogin = async() =>{
        let result = await axios.post("http://localhost:5000/login",JSON.stringify({email,password}), {
            // method: 'post',
            // body: JSON.stringify({email, password}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        // result = await result.json();
        if(result.data.auth) {
            localStorage.setItem('user', JSON.stringify(result.data.user))
            localStorage.setItem('token', JSON.stringify(result.data.auth))
            navigate('/')
        }else{
            alert('Please enter correct details')
        }
    }

    return(
        <div className='login'>
            <h1>Login</h1>
            <input type='text' className="inputBox" placeholder='Enter Email' onKeyDown={handleKeyPress}
            onChange={(e)=>setEmail(e.target.value)} />
            <input type='password' className='inputBox' placeholder='Enter password' onKeyDown={handleKeyPress}
            onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin} className="appButton" type='button'>Login</button>

        </div>
    )
}

export default Login