import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();

    // google login
    const GoogleSignIN = () => {
        return (signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);

        }).catch((error) => {
            console.log(error)
        }));
    }




    const authInfo = {
        GoogleSignIN
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