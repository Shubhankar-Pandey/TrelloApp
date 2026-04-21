import DotGrid from '../ReactBitComponents/DotGrid';
import { useForm } from 'react-hook-form';
import GradientText from '../ReactBitComponents/GradientText';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/authSlice';
import { login } from '../Services/Operations/authAPI';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    dispatch(setLoading(true));
    await login(data.email, data.password, navigate, dispatch);
    dispatch(setLoading(false));
  }

  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-sm z-50">
          <div className="w-10 h-10 rounded-full border-2 border-gray-700 border-t-indigo-400 animate-spin mb-4" />
          <p className="text-gray-400 text-sm">Processing...</p>
        </div>
      )}

      {/* Background Grid */}
      <div className="absolute inset-0 bg-black">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#1F2937"
          activeColor="#6366F1"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">

        {/* Heading */}
        <div className="flex flex-wrap gap-2 justify-center items-center mb-10 text-center">
          <p className="text-3xl text-gray-100 font-semibold">
            Welcome back — let's resolve what
          </p>
          <GradientText
            colors={["#818CF8", "#A78BFA", "#F472B6"]}
            animationSpeed={8}
            showBorder={false}
            className="text-3xl font-semibold"
          >
            matters.
          </GradientText>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-black border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-black/50">

          <h2 className="text-gray-100 text-xl font-semibold mb-1">
            Login to your account
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className={`mt-1 p-3 w-full bg-gray-800 border rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                  Password
                </label>
                <a href="/forgetPassword" className="text-indigo-400 text-xs hover:text-indigo-300 hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={`mt-1 p-3 w-full bg-gray-800 border rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-700'
                }`}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 p-3 rounded-xl text-white font-medium bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-900/40 ring-1 ring-indigo-500/30"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;