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
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState();
    const [adminLoading, setAdminLoading] = useState(true);


    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(Auth, googleProvider)
    }

    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(Auth, githubProvider)
    }

    const emailSignup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(Auth, email, password)
    }

    const emailSignin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(Auth, email, password)
    }

    const logOut = () => {
        return signOut(Auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(Auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, []);

    const saveUser = (user) => {
        fetch('https://appointment-project-server-1.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        if (user?.email) {
            fetch(`https://appointment-project-server-1.vercel.app/users?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setAdmin(data)
                    setLoading(false)
                    setAdminLoading(false)
                })
        }
    }, [user?.email])



    const info = {
        googleLogin,
        githubLogin,
        logOut,
        emailSignup,
        emailSignin,
        selected, setSelected,
        user,
        loading,
        adminLoading, admin,
        setAdmin, setAdminLoading,
        saveUser,
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;