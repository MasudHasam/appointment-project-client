import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import TitleHooks from '../TitleHook/TitleHook';


const Dashboard = () => {
    TitleHooks('Dashboard')
    const [allBooked, setAllBooked] = useState()

    useEffect(() => {
        fetch('https://appointment-project-server-1.vercel.app/allBookings')
            .then(res => res.json())
            .then(data => setAllBooked(data))
    }, [allBooked])


    const handlePaid = (id) => {
        const info = {
            status: "Paid",
        }
        fetch(`https://appointment-project-server-1.vercel.app/updateStatus?id=${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged === true) {
                    toast.success('Status Paid update successfullly');
                }
            })
    }


    const handleConfirm = (id) => {
        const info = {
            status: "Confirmed",
        }
        fetch(`https://appointment-project-server-1.vercel.app/updateStatus?id=${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged === true) {
                    toast.success('Status Confirmed update successfullly');
                }
            })
    }


    const handleCancel = (id) => {
        const info = {
            status: "Canceled",
        }
        fetch(`https://appointment-project-server-1.vercel.app/updateStatus?id=${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged === true) {
                    toast.success('Status Canceled update successfullly');
                }
            })
    }


    return (
        <div className='my-6'>
            <h1 className='text-start text-xl font-semibold text-sky-400'>All Booked Data</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 border-2 rounded-sm my-2'>
                {
                    allBooked && allBooked.map(data =>
                        <div data-aos="zoom-in-up" data-aos-duration="1000" key={data?._id} className="card w-11/12 lg:w-96 mx-auto px-2 mt-4 mb-6 bg-base-100 shadow-xl">
                            <div className='flex justify-between items-center'>
                                <div className="card-body pl-1 text-start text-sm text-slate-700">
                                    <h4 className=" text-xl">Name: {data?.name}</h4>
                                    <p>Email: {data?.email}</p>
                                    <p>Booking Date: {data?.currentDate}</p>
                                    <p>Appointment Date: {data?.bookingDate}</p>
                                    <p>Status: {data?.status ? data?.status : 'N/A'}</p>
                                </div>
                                <div className='flex flex-col gap-2 w-24'>
                                    <button onClick={() => handlePaid(data?._id)} className='btn btn-xs btn-outline btn-info mr-1 rounded-md'>Paid</button>
                                    <Toaster />
                                    <button onClick={() => handleConfirm(data?._id)} className='btn btn-xs btn-outline btn-success mr-1 rounded-md'>Confirm</button>
                                    <button onClick={() => handleCancel(data?._id)} className='btn btn-xs btn-outline btn-error mr-1 rounded-md'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Dashboard;