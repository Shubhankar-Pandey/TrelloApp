import DotGrid from '../ReactBitComponents/DotGrid';
import GradientText from '../ReactBitComponents/GradientText';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';
import { resetPasswordToken } from '../Services/Operations/authAPI';

function ForgetPasswordPage() {

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        dispatch(setLoading(true));
        await resetPasswordToken(data.email, navigate);
        dispatch(setLoading(false));
    }

    return (
        <div className='relative min-h-screen bg-gray-950'>

            {/* Loading */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-700 border-t-indigo-400 animate-spin mb-4" />
                    <p className="text-gray-400 text-sm">Sending reset link...</p>
                </div>
            )}

            {/* Background */}
            <div className='absolute inset-0 bg-black'>
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#1F2937"
                    activeColor="#6366F1"
                />
            </div>

            {/* Content */}
            <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>

                {/* Heading */}
                <div className='flex flex-wrap gap-2 justify-center items-center mb-10 text-center'>
                    <p className='text-3xl text-gray-100 font-semibold'>
                        Reset your password and
                    </p>
                    <GradientText
                        colors={["#818CF8", "#A78BFA", "#F472B6"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-semibold"
                    >
                        get back on track.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-black/50'>

                    {/* Icon */}
                    <div className='flex justify-center mb-6'>
                        <div className='w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center'>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <rect x="4" y="11" width="18" height="13" rx="3" stroke="#818CF8" strokeWidth="1.5"/>
                                <path d="M8 11V8a5 5 0 0110 0v3" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
                                <circle cx="13" cy="17" r="1.5" fill="#818CF8"/>
                                <line x1="13" y1="18.5" x2="13" y2="21" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className='text-gray-100 text-xl font-semibold text-center mb-1'>
                        Forgot your password?
                    </h2>
                    <p className='text-gray-500 text-sm text-center mb-6'>
                        Enter your email and we'll send you a reset link
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* Email */}
                        <div>
                            <label className='text-gray-400 text-xs uppercase'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                placeholder='you@example.com'
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                                className={`mt-1 w-full p-3 bg-gray-800 border rounded-xl text-gray-100 placeholder-gray-600
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
                                ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-xs mt-1'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type='submit'
                            className='mt-2 p-3 rounded-xl text-white font-medium bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-900/40 ring-1 ring-indigo-500/30'
                        >
                            Send Reset Link
                        </button>

                    </form>

                    {/* Back */}
                    <div className='flex justify-center mt-6'>
                        <Link
                            to='/login'
                            className='text-sm text-gray-500 hover:text-indigo-400 transition-colors'
                        >
                            ← Back to login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;