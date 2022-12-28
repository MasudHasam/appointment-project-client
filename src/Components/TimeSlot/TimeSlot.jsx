import React from 'react';
import { Link } from 'react-router-dom'

const TimeSlot = ({ time }) => {
    const { timeSlot, meridiem } = time;
    return (
        <div className=' mx-2'>
            <Link className=''>
                <div className="card  bg-base-100 w-[165px] mb-6 lg:mb-8 lg:w-56 hover:px-[1px] shadow-xl image-full h-24">
                    <figure><img src="https://img.freepik.com/free-vector/calendar-icon-white-background_1308-84634.jpg?w=2000" alt="Time Slot" /></figure>
                    <div className="card-body text-center">
                        <h2 className="card-title text-white hover:text-green-400 font-normal text-base lg:font-bold lg:text-2xl">{timeSlot}</h2>
                        <p>{meridiem}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TimeSlot;