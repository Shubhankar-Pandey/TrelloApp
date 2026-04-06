import DotGrid from '../ReactBitComponents/DotGrid';
import GradientText from '../ReactBitComponents/GradientText';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../Services/Operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch('password');

    async function onSubmit(data) {
        dispatch(setLoading(true));
        await resetPassword(token, data.password, data.confirmPassword, navigate);
        dispatch(setLoading(false));
    }

    return (
        <div className='relative min-h-screen bg-white'>

            {/* Loading */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin mb-4" />
                    <p className="text-gray-600 text-sm">Resetting password...</p>
                </div>
            )}

            {/* Background */}
            <div className='absolute inset-0'>
                <DotGrid
                    dotSize={5}
                    gap={15}
                    baseColor="#E5E7EB"
                    activeColor="#6366F1"
                />
            </div>

            {/* Content */}
            <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>

                {/* Heading */}
                <div className='flex flex-wrap gap-2 justify-center items-center mb-10 text-center'>
                    <p className='text-3xl text-gray-900 font-semibold'>
                        Create a new password and
                    </p>
                    <GradientText
                        colors={["#6366F1", "#8B5CF6", "#EC4899"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-semibold"
                    >
                        secure your account.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xl'>

                    {/* Icon */}
                    <div className='flex justify-center mb-6'>
                        <div className='w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center'>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path d="M13 3L4 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7L13 3z" stroke="#6366F1" strokeWidth="1.5"/>
                                <path d="M9 13l3 3 5-5" stroke="#4F46E5" strokeWidth="1.5"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className='text-gray-900 text-xl font-semibold text-center mb-1'>
                        Reset your password
                    </h2>
                    <p className='text-gray-500 text-sm text-center mb-6'>
                        Your new password must be at least 8 characters
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* Password */}
                        <div>
                            <label className='text-gray-600 text-xs uppercase'>
                                New Password
                            </label>
                            <input
                                type='password'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Minimum 8 characters' }
                                })}
                                className={`mt-1 w-full p-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.password && (
                                <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className='text-gray-600 text-xs uppercase'>
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                {...register('confirmPassword', {
                                    required: 'Please confirm password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match'
                                })}
                                className={`mt-1 w-full p-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type='submit'
                            className='mt-2 p-3 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md'
                        >
                            Reset Password
                        </button>

                    </form>

                    {/* Back */}
                    <div className='flex justify-center mt-6'>
                        <Link
                            to='/login'
                            className='text-sm text-gray-500 hover:text-indigo-600 transition'
                        >
                            ← Back to login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResetPassword;