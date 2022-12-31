import React, { useContext, useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import Lottie from 'react-lottie';
import meetingAnimation from '../../meetingTime.json';
import TimeSlot from '../TimeSlot/TimeSlot';
import { AuthContext } from '../../AuthProvider/Authprovider';
import TitleHooks from '../TitleHook/TitleHook';

const Home = () => {
    TitleHooks('Home')
    const [timeSlot, setTimeSlot] = useState();
    const { selected, setSelected } = useContext(AuthContext);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: meetingAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/timeSlots')
            .then(res => res.json())
            .then(data => {
                setTimeSlot(data);
            })
    }, [])

    // console.log(selected);
    return (
        <div>
            <div className='flex flex-col lg:flex-row justify-center items-center my-0 py-0'>
                <div>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </div>
                <div className='w-1/3 h-1/3'>
                    <Lottie
                        options={defaultOptions}
                    />
                </div>
            </div>
            {
                selected ? <p>Available appoinment on {format(selected, 'PP')}</p> :
                    <p className='text-3xl text-red-500 font-bold'> Please select a date first</p>

            }
            <div className='grid grid-cols-2 lg:grid-cols-5 gap-7 my-4'>
                {
                    !timeSlot ? <progress className="progress w-56 text-center"></progress> : timeSlot.map(time => <TimeSlot time={time} key={time._id}></TimeSlot>)
                }
            </div>
        </div>
    );
};

export default Home;