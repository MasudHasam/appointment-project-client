import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, Link } from 'react-router-dom';

const EditAppointment = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const data = useLoaderData();
    const [timeSlot, setTimeSlot] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/timeSlots')
            .then(res => res.json())
            .then(data => setTimeSlot(data))
    }, [])


    const handleBookingUpdate = (newValue) => {
        fetch(`http://localhost:5000/update?id=${data?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newValue)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    alert('Update Succfully')
                } else {
                    alert('Update Faild. Please try again')
                }
            })
            .catch(err => console.log(err))
    }





    return (
        <div className=' flex justify-center items-center  lg:mx-auto my-8 lg:my-24'>
            <div className='lg:w-[655px]'>
                <h1 className='text-2xl font-semibold text-sky-400 mb-4'><u>Edit your booked appointment.</u></h1>

                <form onSubmit={handleSubmit(handleBookingUpdate)}>
                    <div className='flex flex-col lg:flex-row gap-4 justify-center mb-3'>
                        <input type="text" {...register('name')} name='name' defaultValue={data?.name} placeholder="Name" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                        <input type="email" {...register('email')} readOnly defaultValue={data?.email} placeholder="Email" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                    </div>
                    <div className='flex flex-col lg:flex-row gap-4 justify-center mb-3'>
                        <input type="text" {...register('currentDate')} defaultValue={data?.currentDate} readOnly placeholder="Current Date" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                        <input type="text" {...register('bookingDate')} readOnly defaultValue={data?.bookingDate} placeholder="Booking Date" className="input input-bordered rounded-md input-accent w-full max-w-xs" />
                    </div>
                    <div className='flex flex-col  lg:flex-row gap-4 justify-between mb-3'>
                        <select {...register('timeSlot')} className="select select-bordered w-full rounded-md border-orange-300 max-w-xs">
                            <option >{data?.timeSlot}</option>
                            {
                                timeSlot && timeSlot.map(time => <option key={time?._id} >{time.timeSlot}</option>)
                            }
                        </select>
                        <input value='Save Changes' type='submit' className='btn btn-outline btn-infos border-orange-300 w-full max-w-xs rounded-md' />
                    </div>
                </form>
                <Link to='/profile' className='btn btn-error rounded-md btn-outline'>Calcel</Link>
            </div>
        </div>
    );
};

export default EditAppointment;