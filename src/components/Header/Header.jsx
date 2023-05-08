import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Header = () => {

    const {user, signOutWork}=useContext(AuthContext)
    console.log(user);
    
    const handleLogOut = ()=>{

        signOutWork()
        .then(result => { })
        .catch(error => console.error(error))
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
                {user && <span className='text-color'>Welcome{user.email} <button onClick={handleLogOut}>Sign out</button></span>}
            </div>
        </nav>
    );
};

export default Header;