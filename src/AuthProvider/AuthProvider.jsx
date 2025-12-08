import React, { useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../../firebase';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
    const [loding, setLoading] = useState(true)
    const [user, setUser] = useState(true)

    // google login
    const GoogleSignIN = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }
    const GoogleSignOut = () => signOut(auth)


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])

    
    const authInfo = {
        user,
        GoogleSignIN,
        GoogleSignOut,
        loding,
        setLoading
    }
    return (
        <AuthContext value={authInfo}>
            {
                children
            }
        </AuthContext>
    );
};

export default AuthProvider;