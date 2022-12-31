import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/Authprovider';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import TitleHooks from '../TitleHook/TitleHook';


const Booking = () => {
    TitleHooks('Appoinment Booking')
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const data = useLoaderData();
    const { user, selected } = useContext(AuthContext);
    const currentDate = new Date();
    const formatedCurrentDate = <p>{format(currentDate, 'PP')}</p>
    const formatedBookingDate = <p> {format(selected, 'PP')}</p>

    const handleBooking = (data) => {

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === false) {
                    toast.error('You can only book a single slot in a day');
                } else {
                    toast.success('Booked successfullly');
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className=' flex justify-center items-center  lg:mx-auto my-8 lg:my-24'>
            <div className='lg:w-[655px]'>
                <h1 className='text-2xl font-semibold text-sky-400 mb-4'><u>Details about selected appointment.</u></h1>

                <form onSubmit={handleSubmit(handleBooking)}>
                    <div className='flex flex-col lg:flex-row gap-4 justify-center mb-3'>
                        {
                            user?.displayName ?
                                <input type="text" {...register('name')} name='name' defaultValue={user?.displayName} readOnly placeholder="Name" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                                :
                                <input type="text" {...register('name')} defaultValue={user?.displayName} required placeholder="please enter your name" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                        }
                        {
                            user?.email ?
                                <input type="email" {...register('email')} defaultValue={user?.email} readOnly placeholder="Email" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                                :
                                <input type="email" {...register('email')} defaultValue={user?.email} required placeholder="please enter your email" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                        }
                    </div>
                    <div className='flex flex-col lg:flex-row gap-4 justify-center mb-3'>
                        <input type="text" {...register('currentDate')} readOnly defaultValue={formatedCurrentDate?.props?.children} placeholder="Current Date" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                        <input type="text" {...register('bookingDate')} readOnly defaultValue={formatedBookingDate?.props?.children[1]} placeholder="Booking Date" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                    </div>
                    <div className='flex flex-col  lg:flex-row gap-4 justify-between mb-3'>
                        <input {...register('timeSlot')} readOnly type="text" placeholder="Time Slot" defaultValue={`${data?.timeSlot} ${data?.meridiem}`} className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                        <input value='Book Now' type='submit' className='btn btn-outline border-orange-300 w-full max-w-xs rounded-md' />
                        <Toaster />
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Booking;