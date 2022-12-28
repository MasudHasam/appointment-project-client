import React, { createContext } from 'react';
import { getAuth } from 'firebase/auth'
import app from '../Firebase/Firebase.config'
export const AuthContext = createContext();
const Auth = getAuth(app)

const Authprovider = ({ children }) => {


    const info = {
        name: 'masud'
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;