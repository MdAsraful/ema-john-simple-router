import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../firebase/fireBase.config';


export const AuthContext = createContext(null);

const auth =getAuth(app)

const AuthProvider = ({children}) => {

    const [user , setUser]=useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutWork = () =>{
        return signOut(auth)
    }
    
    // observe user auth state 

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
        })
        // Stop observing while unmount 
        return ()=>{
            return unsubscribe();
        }
    },[]) 

    const authInfo={
        user,
        loading,
        createUser,
        signOutWork,
        signIn,
        
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;