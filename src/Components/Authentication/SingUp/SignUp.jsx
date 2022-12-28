import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import google from '../../../Assets/Logo/Google.png'
import github from '../../../Assets/Logo/Github.png'
import Lottie from 'react-lottie';
import signupAnimation from '../../../signup.json';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [loginError, setLoginError] = useState();

    const handelSignup = (data) => {
        console.log(data);
    }

    const googleSignin = () => {
        console.log('google');
    }
    const githubSignin = () => {
        console.log('github');
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: signupAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div>
            <div className="hero min-h-screen my-1 lg:my-8">
                <div className="hero-content flex-col lg:flex-row lg:justify-around">
                    <div className="hidden lg:block w-[500px]">
                        <Lottie
                            options={defaultOptions}
                        />
                    </div>
                    <div className="card max-w-sm shadow-2xl pb-2">
                        <form onSubmit={handleSubmit(handelSignup)} className='   px-2 py-2 rounded-md mt-2'>
                            <div className="form-control w-full rounded-md">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" className="input input-bordered w-full rounded-md" {...register("email", { required: 'Please Enter Your Email' })} placeholder="Email" />
                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                            </div>
                            <div className="form-control w-full rounded-md">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" className="input input-bordered w-full rounded-md" {...register("password", { required: 'Please Enter Your Password', minLength: { value: 6, message: 'Password must be atleast 6 charecter' } })} placeholder="Password" />
                                {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                            </div>
                            <input className='btn btn-ghost mt-3 bg-slate-500 text-white hover:text-black rounded-md w-full' value='Sign Up' type="submit" />
                            {
                                <p className='text-red-500'>{ }</p>
                            }
                            <p className='text-center'><Link to='/signin' className='text-sky-500 font-semibold'><small>Already have an account</small></Link></p>
                            <div className="divider">OR</div>
                        </form>
                        <div className='mx-2'>
                            <button onClick={googleSignin} className='btn mb-1 hover:bg-green-400 hover:text-white font-semibold btn-outline w-full mb-1s rounded-md'><img className='w-5 h-4 pr-1' src={google} alt="" /> Continue with google</button>
                            <button onClick={githubSignin} className='btn  hover:bg-green-400 hover:text-white font-semibold btn-outline w-full mb-1s rounded-md'><img className='w-5 h-4 pr-1' src={github} alt="" /> CONTINUE WITH GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;