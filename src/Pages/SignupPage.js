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
        console.log("Signup Data:", data);

        dispatch(setSignupData(data));
        dispatch(setLoading(true));

        await sendOtp(data.email, navigate);

        dispatch(setLoading(false));
    }

    const inputClass = (hasError) =>
        `w-full p-3 bg-white/5 rounded-xl border text-white text-sm placeholder-white/20
        outline-none transition-all duration-200
        focus:bg-white/10 focus:border-[#5227FF]
        ${hasError ? 'border-red-500/60' : 'border-white/10'}`;

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

            {/* Scrollable overlay */}
            <div className='relative z-10 flex flex-col items-center justify-start px-4 pt-32 pb-10 min-h-screen overflow-y-auto'>

                {/* Headline */}
                <div className='flex flex-wrap gap-x-2 justify-center items-center mb-10'>
                    <p className='text-3xl text-white tracking-tight'>
                        Create your workspace. Invite your team.
                    </p>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl tracking-tight"
                    >
                        Start resolving.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl'>

                    <h2 className='text-white text-xl font-semibold mb-1 tracking-tight'>
                        Create your account
                    </h2>
                    <p className='text-white/40 text-sm mb-8 font-light'>
                        Fill in the details below to get started
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* First Name + Last Name */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-white/60 text-xs font-medium uppercase tracking-widest'>
                                    First Name
                                </label>
                                <input
                                    type='text'
                                    placeholder='John'
                                    {...register('firstName', { required: 'Required' })}
                                    className={inputClass(errors.firstName)}
                                />
                                {errors.firstName && (
                                    <p className='text-red-400 text-xs'>{errors.firstName.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-1.5'>
                                <label className='text-white/60 text-xs font-medium uppercase tracking-widest'>
                                    Last Name
                                </label>
                                <input
                                    type='text'
                                    placeholder='Doe'
                                    {...register('lastName', { required: 'Required' })}
                                    className={inputClass(errors.lastName)}
                                />
                                {errors.lastName && (
                                    <p className='text-red-400 text-xs'>{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-white/60 text-xs font-medium uppercase tracking-widest'>
                                Email
                            </label>
                            <input
                                type='email'
                                placeholder='you@example.com'
                                {...register('email', { required: 'Email required' })}
                                className={inputClass(errors.email)}
                            />
                            {errors.email && (
                                <p className='text-red-400 text-xs'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-white/60 text-xs font-medium uppercase tracking-widest'>
                                Password
                            </label>
                            <input
                                type='password'
                                placeholder='Min. 8 characters'
                                {...register('password', { required: 'Password required' })}
                                className={inputClass(errors.password)}
                            />
                            {errors.password && (
                                <p className='text-red-400 text-xs'>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label className='text-white/60 text-xs font-medium uppercase tracking-widest'>
                                Confirm Password
                            </label>
                            <input
                                type='password'
                                placeholder='Re-enter your password'
                                {...register('confirmPassword', {
                                    required: 'Confirm password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match'
                                })}
                                className={inputClass(errors.confirmPassword)}
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-400 text-xs'>{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Role Selection */}
                        <div className='flex flex-col gap-2.5'>
                            <p className='text-white/60 text-xs font-medium uppercase tracking-widest'>
                                I am joining as
                            </p>
                            <div className='grid grid-cols-2 gap-3'>
                                {['Owner', 'Employee'].map((role) => (
                                    <label
                                        key={role}
                                        htmlFor={role}
                                        className={`relative flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${watch('role') === role ? 'border-[#5227FF] bg-[#5227FF]/10' : 'border-white/10 bg-white/5 hover:border-white/25'}`}
                                    >
                                        <input
                                            id={role}
                                            type='radio'
                                            value={role}
                                            {...register('role')}
                                            className='sr-only'
                                        />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${watch('role') === role ? 'border-[#5227FF]' : 'border-white/30'}`}>
                                            {watch('role') === role && (
                                                <div className='w-2 h-2 rounded-full bg-gradient-to-br from-[#5227FF] to-[#B19EEF]' />
                                            )}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium capitalize tracking-wide transition-colors duration-200 ${watch('role') === role ? 'text-white' : 'text-white/50'}`}>
                                                {role}
                                            </p>
                                            <p className='text-white/30 text-xs font-light mt-0.5'>
                                                {role === 'owner' ? 'Manage your workspace' : 'Work within a team'}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='mt-2 p-3 rounded-xl text-white text-sm font-medium tracking-wide bg-gradient-to-r from-[#5227FF] to-[#B19EEF] hover:opacity-90 hover:scale-[0.98] active:scale-95 transition-all duration-200 shadow-lg shadow-[#5227FF]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                        >
                            {loading ? 'Please wait...' : 'Create Account'}
                        </button>

                    </form>

                    <p className='text-center text-white/30 text-xs mt-8 font-light'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-[#B19EEF] hover:text-[#FF9FFC] transition-colors duration-200 no-underline'>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;