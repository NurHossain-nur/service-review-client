import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContexts';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create or register user
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // sign in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // update profile
    const updateUser = (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData);
    }

    // google sign in
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    // aubserver
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        updateUser,
        googleLogin,
        logOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;