import DotGrid from '../ReactBitComponents/DotGrid';
import { useForm } from 'react-hook-form';
import GradientText from '../ReactBitComponents/GradientText';
import { useNavigate, Link } from 'react-router-dom';
import { sendOtp } from '../Services/Operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setSignupData } from '../Redux/authSlice';

function SignupPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { role: 'Employee' }
    });

    const password = watch('password');

    async function onSubmit(data) {
        dispatch(setSignupData(data));
        dispatch(setLoading(true));
        await sendOtp(data.email, navigate);
        dispatch(setLoading(false));
    }

    const inputClass = (hasError) =>
        `w-full p-3 bg-gray-50 rounded-xl border text-gray-900 text-sm placeholder-gray-400
        outline-none transition-all duration-200
        focus:bg-white focus:ring-2 focus:ring-indigo-500
        ${hasError ? 'border-red-500' : 'border-gray-300'}`;

    return (
        <div className='relative min-h-screen bg-white'>

            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin mb-4" />
                    <p className="text-gray-600 text-sm">Sending OTP...</p>
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
            <div className='relative z-10 flex flex-col items-center justify-start px-4 pt-24 pb-10 min-h-screen'>

                {/* Heading */}
                <div className='flex flex-wrap gap-2 justify-center items-center mb-10 text-center'>
                    <p className='text-3xl text-gray-900 font-semibold'>
                        Create your workspace. Invite your team.
                    </p>
                    <GradientText
                        colors={["#6366F1", "#8B5CF6", "#EC4899"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-semibold"
                    >
                        Start resolving.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-lg bg-white border-2 border-black rounded-2xl p-8 shadow-xl'>

                    <h2 className='text-gray-900 text-xl font-semibold mb-1'>
                        Create your account
                    </h2>
                    <p className='text-gray-500 text-sm mb-6'>
                        Fill in the details below to get started
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* Name */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='text-gray-600 text-xs uppercase'>First Name</label>
                                <input
                                    type='text'
                                    {...register('firstName', { required: 'Required' })}
                                    className={inputClass(errors.firstName)}
                                />
                                {errors.firstName && <p className='text-red-500 text-xs'>{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <label className='text-gray-600 text-xs uppercase'>Last Name</label>
                                <input
                                    type='text'
                                    {...register('lastName', { required: 'Required' })}
                                    className={inputClass(errors.lastName)}
                                />
                                {errors.lastName && <p className='text-red-500 text-xs'>{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className='text-gray-600 text-xs uppercase'>Email</label>
                            <input
                                type='email'
                                {...register('email', { required: 'Email required' })}
                                className={inputClass(errors.email)}
                            />
                            {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className='text-gray-600 text-xs uppercase'>Password</label>
                            <input
                                type='password'
                                {...register('password', { required: 'Password required' })}
                                className={inputClass(errors.password)}
                            />
                            {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className='text-gray-600 text-xs uppercase'>Confirm Password</label>
                            <input
                                type='password'
                                {...register('confirmPassword', {
                                    required: 'Confirm password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match'
                                })}
                                className={inputClass(errors.confirmPassword)}
                            />
                            {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <p className='text-gray-600 text-xs uppercase mb-2'>I am joining as</p>
                            <div className='grid grid-cols-2 gap-3'>
                                {['Owner', 'Employee'].map((role) => (
                                    <label
                                        key={role}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all
                                        ${watch('role') === role
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-300 bg-gray-50 hover:border-gray-400'}`}
                                    >
                                        <input
                                            type='radio'
                                            value={role}
                                            {...register('role')}
                                            className='hidden'
                                        />
                                        <p className={`text-sm font-medium ${
                                            watch('role') === role ? 'text-gray-900' : 'text-gray-600'
                                        }`}>
                                            {role}
                                        </p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='mt-2 p-3 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50'
                        >
                            {loading ? 'Please wait...' : 'Create Account'}
                        </button>

                    </form>

                    <p className='text-center text-gray-500 text-sm mt-6'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-indigo-600 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;