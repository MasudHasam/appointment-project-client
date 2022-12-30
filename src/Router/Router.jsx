import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from '../Components/Authentication/SignIn/SignIn';
import SignUp from '../Components/Authentication/SingUp/SignUp';
import Booking from '../Components/Booking/Booking';
import Dashboard from '../Components/Dashboard/Dashboard';
import EditAppointment from '../Components/EditAppointment/EditAppointment';
import Home from '../Components/Home/Home';
import Layout from '../Components/Layout/Layout';
import UserProfile from '../Components/UserProfile/UserProfile';

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
                    path: '/signup',
                    element: <SignUp></SignUp>
                },
                {
                    path: '/dashboard',
                    element: <Dashboard></Dashboard>
                },
                {
                    path: '/booking/:id',
                    loader: ({ params }) => fetch(`http://localhost:5000/timeSlot/${params.id}`),
                    element: <Booking></Booking>
                },
                {
                    path: '/profile',
                    element: <UserProfile></UserProfile>
                },
                {
                    path: '/edit/:id',
                    loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.id}`),
                    element: <EditAppointment></EditAppointment>
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