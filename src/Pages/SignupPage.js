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
        `w-full p-3 bg-gray-800 rounded-xl border text-gray-100 text-sm placeholder-gray-600
        outline-none transition-all duration-200
        focus:bg-gray-750 focus:ring-2 focus:ring-indigo-500 focus:border-transparent
        ${hasError ? 'border-red-500' : 'border-gray-700'}`;

    return (
        <div className='relative min-h-screen bg-gray-950'>

            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-700 border-t-indigo-400 animate-spin mb-4" />
                    <p className="text-gray-400 text-sm">Sending OTP...</p>
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
            <div className='relative z-10 flex flex-col items-center justify-start px-4 pt-24 pb-10 min-h-screen'>

                {/* Heading */}
                <div className='flex flex-wrap gap-2 justify-center items-center mb-10 text-center'>
                    <p className='text-3xl text-gray-100 font-semibold'>
                        Create your workspace. Invite your team.
                    </p>
                    <GradientText
                        colors={["#818CF8", "#A78BFA", "#F472B6"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-semibold"
                    >
                        Start resolving.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-lg bg-black border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-black/50'>

                    <h2 className='text-gray-100 text-xl font-semibold mb-1'>
                        Create your account
                    </h2>
                    <p className='text-gray-500 text-sm mb-6'>
                        Fill in the details below to get started
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* Name */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='text-gray-400 text-xs uppercase'>First Name</label>
                                <input
                                    type='text'
                                    placeholder='First Name'
                                    {...register('firstName', { required: 'Required' })}
                                    className={inputClass(errors.firstName)}
                                />
                                {errors.firstName && <p className='text-red-400 text-xs'>{errors.firstName.message}</p>}
                            </div>

                            <div>
                                <label className='text-gray-400 text-xs uppercase'>Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Last Name'
                                    {...register('lastName', { required: 'Required' })}
                                    className={inputClass(errors.lastName)}
                                />
                                {errors.lastName && <p className='text-red-400 text-xs'>{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className='text-gray-400 text-xs uppercase'>Email</label>
                            <input
                                type='email'
                                placeholder='Email'
                                {...register('email', { required: 'Email required' })}
                                className={inputClass(errors.email)}
                            />
                            {errors.email && <p className='text-red-400 text-xs'>{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className='text-gray-400 text-xs uppercase'>Password</label>
                            <input
                                type='password'
                                placeholder='Password'
                                {...register('password', { required: 'Password required' })}
                                className={inputClass(errors.password)}
                            />
                            {errors.password && <p className='text-red-400 text-xs'>{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className='text-gray-400 text-xs uppercase'>Confirm Password</label>
                            <input
                                type='password'
                                placeholder='Confirm password'
                                {...register('confirmPassword', {
                                    required: 'Confirm password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match'
                                })}
                                className={inputClass(errors.confirmPassword)}
                            />
                            {errors.confirmPassword && <p className='text-red-400 text-xs'>{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Role */}
                        <div>
                            <p className='text-gray-400 text-xs uppercase mb-2'>I am joining as</p>
                            <div className='grid grid-cols-2 gap-3'>
                                {['Owner', 'Employee'].map((role) => (
                                    <label
                                        key={role}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all flex gap-x-2
                                        ${watch('role') === role
                                            ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30'
                                            : 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}
                                    >
                                        <input
                                            type='radio'
                                            value={role}
                                            {...register('role')}
                                            // className='hidden'
                                        />
                                        <p className={`text-sm font-medium ${
                                            watch('role') === role ? 'text-indigo-300' : 'text-gray-400'
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
                            className='mt-2 p-3 rounded-xl text-white font-medium bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-900/40 ring-1 ring-indigo-500/30 disabled:opacity-50'
                        >
                            {loading ? 'Please wait...' : 'Create Account'}
                        </button>

                    </form>

                    <p className='text-center text-gray-500 text-sm mt-6'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-indigo-400 hover:text-indigo-300 hover:underline transition-colors'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;