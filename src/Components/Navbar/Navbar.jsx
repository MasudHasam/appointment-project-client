import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Authprovider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);


    const signOut = () => {
        logOut()
            .then()
            .catch(err => console.log(err))
    }

    const middleItem = [
        <li className=' font-semibold' key={1}><Link to='/'>Appointment</Link></li>,
        <li className=' font-semibold' key={2}><Link to='/dashboard'>Dashboard</Link></li>,
    ]

    const navEndItem = [
        user?.displayName || user?.email ?
            <div key={2} className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user?.photoURL ? user?.photoURL : 'https://placeimg.com/80/80/people'} alt='' />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <Link to='/profile' className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </Link>
                    </li>
                    <li><Link>Settings</Link></li>
                    <li onClick={signOut}><Link>Logout</Link></li>
                </ul>
            </div>
            :
            <Link to='/signin' key={1} className="btn btn-xs btn-outline">Sign In</Link>

    ]

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {middleItem}
                        </ul>
                    </div>
                    <Link to='/' className=" normal-case text-xl font-bold text-sky-500">DevSoftBD</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {middleItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    {navEndItem}
                </div>
            </div>
        </div>
    );
};

export default Navbar;