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
    <div className="relative min-h-screen bg-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
          <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin mb-4" />
          <p className="text-gray-600 text-sm">Processing...</p>
        </div>
      )}

      {/* Background Grid */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#E5E7EB"
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
          <p className="text-3xl text-gray-900 font-semibold">
            Welcome back — let's resolve what
          </p>
          <GradientText
            colors={["#6366F1", "#8B5CF6", "#EC4899"]}
            animationSpeed={8}
            showBorder={false}
            className="text-3xl font-semibold"
          >
            matters.
          </GradientText>
        </div>

        {/* Card */}
        <div className="w-full max-w-md bg-white border-2 border-black rounded-2xl p-8 shadow-xl">

          <h2 className="text-gray-900 text-xl font-semibold mb-1">
            Login to your account
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
                className={`mt-1 p-3 w-full bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                  Password
                </label>
                <a href="/forgetPassword" className="text-indigo-600 text-xs hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
                className={`mt-1 p-3 w-full bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-2 p-3 rounded-xl text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
