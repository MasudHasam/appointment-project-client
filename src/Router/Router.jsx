import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from '../Components/Authentication/SignIn/SignIn';
import SignUp from '../Components/Authentication/SingUp/SignUp';
import Home from '../Components/Home/Home';
import Layout from '../Components/Layout/Layout';

const Router = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout></Layout>,
            children: [
                {
                    path: '/',
                    element: <Home></Home>
                },
                {
                    path: '/signin',
                    element: <SignIn></SignIn>
                },
                {
                    path: 'signup',
                    element: <SignUp></SignUp>
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router}>
        </RouterProvider>
    );
};

export default Router;