import React, { useContext } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const {signIn}= useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from =location.state?.from?.pathname || '/';

    const handleLogIn = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
            const loggedUser =result.user;
            console.log(loggedUser)
            form.reset();
            navigate(from)
        })
        .catch(error =>{
            console.log(error)
        })

    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Login </h2>
            <form onSubmit={handleLogIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                </div>
                <input className='btn-submit' type="submit" value='LogIn'/>
            </form>
            <p className='signup'><small>New to Ema-john? <span><Link to='/signup'>Sign up</Link></span></small></p>
        </div>
    );
};

export default Login;