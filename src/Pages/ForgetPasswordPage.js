import DotGrid from '../ReactBitComponents/DotGrid';
import GradientText from '../ReactBitComponents/GradientText';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';
import { resetPasswordToken } from '../Services/Operations/authAPI';



function ForgetPasswordPage() {

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        console.log(data);
        dispatch(setLoading(true));
        await resetPasswordToken(data.email, navigate);
        dispatch(setLoading(false));
    }

    return (
        <div className='relative'>

            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#5227FF] animate-spin mb-4" />
                    <p className="text-white/60 text-sm font-light tracking-wide">Sending reset link...</p>
                </div>
            )}

            {/* Background */}
            <div className='w-screen h-screen bg-black fixed top-0 left-0'>
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
            <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>

                {/* Headline */}
                <div className='flex flex-wrap gap-x-2 justify-center items-center mb-10'>
                    <p className='text-3xl font-thin text-white tracking-tight'>
                        Reset your password and
                    </p>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-thin tracking-tight"
                    >
                        get back on track.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl'>

                    {/* Lock icon */}
                    <div className='flex justify-center mb-6'>
                        <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5227FF]/20 to-[#B19EEF]/20 border border-[#5227FF]/30 flex items-center justify-center shadow-lg shadow-[#5227FF]/10'>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <rect x="4" y="11" width="18" height="13" rx="3" stroke="#B19EEF" strokeWidth="1.5"/>
                                <path d="M8 11V8a5 5 0 0110 0v3" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="13" cy="17" r="1.5" fill="#B19EEF"/>
                                <line x1="13" y1="18.5" x2="13" y2="21" stroke="#B19EEF" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className='text-white text-xl font-semibold mb-1 tracking-tight text-center'>
                        Forgot your password?
                    </h2>
                    <p className='text-white/40 text-sm mb-8 font-light text-center leading-relaxed'>
                        Enter your registered email address and we'll send you a reset link.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='email'
                                className='text-white/60 text-xs font-medium uppercase tracking-widest'
                            >
                                Email Address
                            </label>
                            <input
                                id='email'
                                type='email'
                                placeholder='you@example.com'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email'
                                    }
                                })}
                                className={`w-full p-3 bg-white/5 rounded-xl border text-white text-sm placeholder-white/20
                                    outline-none transition-all duration-200
                                    focus:bg-white/10 focus:border-[#5227FF]
                                    ${errors.email ? 'border-red-500/60' : 'border-white/10'}`}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-xs'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            className='mt-2 p-3 rounded-xl text-white text-sm font-medium tracking-wide
                                bg-gradient-to-r from-[#5227FF] to-[#B19EEF]
                                hover:opacity-90 hover:scale-[0.98] active:scale-95
                                transition-all duration-200 shadow-lg shadow-[#5227FF]/30'
                        >
                            Send Reset Link
                        </button>

                    </form>

                    {/* Back to login */}
                    <div className='flex justify-center mt-6'>
                        <Link
                            to='/login'
                            className='flex items-center gap-1.5 text-white/30 text-xs hover:text-white/60 transition-colors duration-200 no-underline'
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M8 1L3 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Back to login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;