import DotGrid from '../ReactBitComponents/DotGrid';
import GradientText from '../ReactBitComponents/GradientText';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../Services/Operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';



function ResetPassword() {

    const params = useParams();
    const token = params.token;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch('password');

    async function onSubmit(data) {
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        dispatch(setLoading(true));
        await resetPassword(token, password, confirmPassword, navigate)
        dispatch(setLoading(false));
    }

    return (
        <div className='relative'>

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
            <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4 mt-10'>

                {/* Headline */}
                <div className='flex flex-wrap gap-x-2 justify-center items-center mb-10'>
                    <p className='text-3xl font-thin text-white tracking-tight'>
                        Create a new password and
                    </p>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-thin tracking-tight"
                    >
                        secure your account.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl'>

                    {/* Shield icon */}
                    <div className='flex justify-center mb-6'>
                        <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5227FF]/20 to-[#B19EEF]/20 border border-[#5227FF]/30 flex items-center justify-center shadow-lg shadow-[#5227FF]/10'>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                                <path d="M13 3L4 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7L13 3z" stroke="#B19EEF" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M9 13l3 3 5-5" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className='text-white text-xl font-semibold mb-1 tracking-tight text-center'>
                        Reset your password
                    </h2>
                    <p className='text-white/40 text-sm mb-8 font-light text-center leading-relaxed'>
                        Your new password must be at least 8 characters long.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

                        {/* New Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='password'
                                className='text-white/60 text-xs font-medium uppercase tracking-widest'
                            >
                                New Password
                            </label>
                            <input
                                id='password'
                                type='password'
                                placeholder='Min. 8 characters'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Must be at least 8 characters' }
                                })}
                                className={`w-full p-3 bg-white/5 rounded-xl border text-white text-sm placeholder-white/20
                                    outline-none transition-all duration-200
                                    focus:bg-white/10 focus:border-[#5227FF]
                                    ${errors.password ? 'border-red-500/60' : 'border-white/10'}`}
                            />
                            {errors.password && (
                                <p className='text-red-400 text-xs'>{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className='flex flex-col gap-1.5'>
                            <label
                                htmlFor='confirmPassword'
                                className='text-white/60 text-xs font-medium uppercase tracking-widest'
                            >
                                Confirm Password
                            </label>
                            <input
                                id='confirmPassword'
                                type='password'
                                placeholder='Re-enter your password'
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: (value) =>
                                        value === password || 'Passwords do not match'
                                })}
                                className={`w-full p-3 bg-white/5 rounded-xl border text-white text-sm placeholder-white/20
                                    outline-none transition-all duration-200
                                    focus:bg-white/10 focus:border-[#5227FF]
                                    ${errors.confirmPassword ? 'border-red-500/60' : 'border-white/10'}`}
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-400 text-xs'>{errors.confirmPassword.message}</p>
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
                            Reset Password
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

export default ResetPassword;