import DotGrid from '../ReactBitComponents/DotGrid';
import { useForm } from 'react-hook-form';
import GradientText from '../ReactBitComponents/GradientText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';
import { login } from '../Services/Operations/authAPI';
import { useEffect } from 'react';
import {toast} from "react-hot-toast"


function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // FIX 1: Renamed to onSubmit to avoid shadowing useForm's handleSubmit
    async function onSubmit(data) {
        console.log("data = ", data);
        dispatch(setLoading(true));

        await login(data.email, data.password, navigate, dispatch);

        dispatch(setLoading(false));
    }

    return (
        <div className='relative'>
            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#5227FF] animate-spin mb-4" />
                    <p className="text-white/60 text-sm font-light tracking-wide">Sending OTP...</p>
                </div>
            )}
            {/* Background */}
            <div className='w-screen h-screen bg-black'>
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#271E37"
                    activeColor="#5227FF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            {/* Centered overlay */}
            <div className='absolute inset-0 flex flex-col items-center justify-center px-4 pt-20'>

                {/* Headline */}
                <div className='flex flex-wrap gap-x-2 justify-center items-center mb-10'>
                    <p className='text-3xl text-white tracking-tight'>
                        Welcome back — lets resolve what
                    </p>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl tracking-tight"
                    >
                        matters.”
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl'>

                    <h2 className='text-white text-xl font-semibold mb-1 tracking-tight'>
                        Welcome back
                    </h2>
                    <p className='text-white/40 text-sm mb-8 font-light'>
                        Sign in to your account to continue
                    </p>

                    {/* FIX 2: handleSubmit now correctly wraps your onSubmit callback */}
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='email'
                                className='text-white/60 text-xs font-medium uppercase tracking-widest'
                            >
                                Email
                            </label>
                            <input
                                id='email'
                                type='email'
                                placeholder='you@example.com'
                                {...register("email", { required: "Email is required" })}
                                className={`p-3 bg-white/5 rounded-xl border text-white text-sm placeholder-white/20
                                    outline-none transition-all duration-200
                                    focus:bg-white/10 focus:border-[#5227FF]
                                    ${errors.email ? 'border-red-500/60' : 'border-white/10'}`}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-xs mt-0.5'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-1.5'>
                            <div className='flex justify-between items-center'>
                                <label
                                    htmlFor='password'
                                    className='text-white/60 text-xs font-medium uppercase tracking-widest'
                                >
                                    Password
                                </label>
                                <a href='#' className='text-[#B19EEF] text-xs hover:text-[#FF9FFC] transition-colors duration-200'>
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                id='password'
                                type='password'
                                placeholder='••••••••'
                                {...register("password", { required: "Password is required" })}
                                className={`p-3 bg-white/5 rounded-xl border text-white text-sm placeholder-white/20
                                    outline-none transition-all duration-200
                                    focus:bg-white/10 focus:border-[#5227FF]
                                    ${errors.password ? 'border-red-500/60' : 'border-white/10'}`}
                            />
                            {errors.password && (
                                <p className='text-red-400 text-xs mt-0.5'>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            className='mt-2 p-3 rounded-xl text-white text-sm font-medium tracking-wide
                                bg-gradient-to-r from-[#5227FF] to-[#B19EEF]
                                hover:opacity-90 hover:scale-[0.98]
                                active:scale-95
                                transition-all duration-200 shadow-lg shadow-[#5227FF]/30'
                        >
                            Log In
                        </button>

                    </form>

                    <p className='text-center text-white/30 text-xs mt-8 font-light'>
                        Don't have an account?{' '}
                        <a href='#' className='text-[#B19EEF] hover:text-[#FF9FFC] transition-colors duration-200'>
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;