import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../Firebase/Firebase.config'
export const AuthContext = createContext();

const Auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Authprovider = ({ children }) => {
    const [user, setUser] = useState();
    const date = new Date();
    const [selected, setSelected] = React.useState(date);

    const googleLogin = () => {
        return signInWithPopup(Auth, googleProvider)
    }

    const githubLogin = () => {
        return signInWithPopup(Auth, githubProvider)
    }

    const emailSignup = (email, password) => {
        return createUserWithEmailAndPassword(Auth, email, password)
    }

    const emailSignin = (email, password) => {
        return signInWithEmailAndPassword(Auth, email, password)
    }

    const logOut = () => {
        return signOut(Auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(Auth, currentUser => {
            setUser(currentUser)
        })
        return () => unSubscribe();
    }, [])

    const info = {
        googleLogin,
        githubLogin,
        logOut,
        emailSignup,
        emailSignin,
        selected, setSelected,
        user,
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;