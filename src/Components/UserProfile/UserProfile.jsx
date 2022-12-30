import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Authprovider';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();

    // console.log(userData);
    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [user, userData])


    const handleCalcel = (id) => {
        fetch(`http://localhost:5000/delete?id=${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged === true) {
                    alert('Canceled Successfully')
                } else {
                    alert('Cancel Faild')
                }
            })
    }


    return (
        <div className='my-8'>
            <h1 className='my-2'>All of your booked appointment</h1>


            <ol>
                {userData?.map((data, idx) =>
                    <li key={data?._id}>
                        <h1 className='flex justify-start mx-4 mb-1 mt-5 font-bold text-xl'>{idx + 1}</h1>
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table w-full">

                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td>Name</td>
                                            <td>{data.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{data.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Booked Date</td>
                                            <td>{data.currentDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Appointment Date</td>
                                            <td>{data.bookingDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Appointment Time</td>
                                            <td>{data.timeSlot}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
                                <Link to={`/edit/${data?._id}`} className='btn btn-sm w-1/2 btn-outline rounded-md'><button>Edit Appointment</button></Link>
                                <Link onClick={() => handleCalcel(data?._id)} className='btn btn-sm w-1/2  btn-outline btn-error rounded-md'><button >Cancel Appointment</button></Link>
                            </div>
                        </div>
                    </li>
                )}
            </ol>






        </div>
    );
};

export default UserProfile;