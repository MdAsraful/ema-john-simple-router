import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const SignUp = () => {

    const [error, setError]=useState('');
    const {createUser} =useContext(AuthContext);

    const handleSignUp= event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        console.log(email,password,confirmPassword)

        setError('');
        if(password !==confirmPassword){
            setError('Your Password did not match');
            return
        }
        else if(password.length < 6){
            setError('Password must be 6 character or long ')
        }

        createUser(email,password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .catch(error =>{
            console.log(error);
            setError(error.message);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up </h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' required />
                </div>
                <input className='btn-submit' type="submit" value='Sign Up'/>
            </form>
            <p className='login'><small>Already have an account? <Link to='/login'>Login</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;