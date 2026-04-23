import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DotGrid from '../ReactBitComponents/DotGrid';
import GradientText from '../ReactBitComponents/GradientText';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { removeSignupData, setLoading } from '../Redux/authSlice';
import { signup } from '../Services/Operations/authAPI';
import { sendOtp } from '../Services/Operations/authAPI';



function VerifyEmailPage() {

    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);
    const {signupData} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup"); // redirect if no data
        }
    }, [])

    const inputRefs = useRef([]);

    // Auto-focus next input as user types
    function handleChange(e, index) {
        const value = e.target.value.replace(/[^0-9]/g, ''); // digits only
        e.target.value = value;

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    }

    // Allow backspace to go to previous input
    function handleKeyDown(e, index) {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    // Handle paste — spread digits across boxes
    function handlePaste(e) {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        pasted.split('').forEach((char, i) => {
            if (inputRefs.current[i]) {
                inputRefs.current[i].value = char;
            }
        });
        const nextEmpty = pasted.length < 6 ? pasted.length : 5;
        inputRefs.current[nextEmpty].focus();
    }

    
    async function onSubmit() {
        const code = inputRefs.current.map((el) => el.value).join('');
        if (code.length < 6){
            toast.error("Invalid otp");
        }

        dispatch(setLoading(true));
        const otp = code;
        
        try{
            const response = await signup(signupData.password, signupData.confirmPassword, otp, signupData.firstName, signupData.lastName, signupData.email, signupData.role, navigate);
            if(!response || !response.success){
                return;
            }
            dispatch(removeSignupData(null));
        }
        catch(error){
            console.log(error);
        }
        finally{
            dispatch(setLoading(false));
        }        
        
    }

    async function handleRendOtp() {
        try{
            dispatch(setLoading(true));
            const response = await sendOtp(signupData.email, navigate);
            toast.success("OTP sent");
            dispatch(setLoading(false));
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className='relative'>

            {/* Loading overlay */}
            {loading && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#5227FF] animate-spin mb-4" />
                    <p className="text-white/60 text-sm font-light tracking-wide"> Processing request...</p>
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
                        Check your inbox and
                    </p>
                    <GradientText
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        animationSpeed={8}
                        showBorder={false}
                        className="text-3xl font-thin tracking-tight"
                    >
                        verify your email.
                    </GradientText>
                </div>

                {/* Card */}
                <div className='w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl'>

                    {/* Mail icon */}
                    <div className='flex justify-center mb-6'>
                        <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5227FF]/20 to-[#B19EEF]/20 border border-[#5227FF]/30 flex items-center justify-center shadow-lg shadow-[#5227FF]/10'>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <rect x="2" y="6" width="24" height="17" rx="3" stroke="#B19EEF" strokeWidth="1.5"/>
                                <path d="M2 10L12.586 17.414a2 2 0 002.828 0L26 10" stroke="#5227FF" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                    </div>

                    <h2 className='text-white text-xl font-semibold mb-1 tracking-tight text-center'>
                        Enter verification code
                    </h2>
                    <p className='text-white/40 text-sm mb-8 font-light text-center leading-relaxed'>
                        We've sent a 6-digit code to your registered email address. It expires in 10 minutes.
                    </p>

                    {/* OTP Inputs */}
                    <div className='flex justify-center gap-3 mb-8' onPaste={handlePaste}>
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <input
                                key={index}
                                type='text'
                                inputMode='numeric'
                                maxLength={1}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className='w-11 h-14 text-center text-white text-xl font-semibold
                                    bg-white/5 border border-white/10 rounded-xl
                                    outline-none caret-[#5227FF]
                                    focus:border-[#5227FF] focus:bg-[#5227FF]/10
                                    transition-all duration-200'
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={onSubmit}
                        className='w-full p-3 rounded-xl text-white text-sm font-medium tracking-wide
                            bg-gradient-to-r from-[#5227FF] to-[#B19EEF]
                            hover:opacity-90 hover:scale-[0.98] active:scale-95
                            transition-all duration-200 shadow-lg shadow-[#5227FF]/30'
                    >
                        Verify Email
                    </button>

                    {/* Resend */}
                    <p className='text-center text-white/30 text-xs mt-6 font-light'>
                        Didn't receive a code?{' '}
                        <button onClick={() => handleRendOtp()} className='text-[#B19EEF] hover:text-[#FF9FFC] transition-colors duration-200 cursor-pointer bg-transparent border-none'>
                            Resend code
                        </button>
                    </p>

                    {/* Back to login */}
                    <div className='flex justify-center mt-4'>
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

export default VerifyEmailPage;