import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

export type RegisterInput = {
  email: string;
  username: string;
  password: string;
};

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>();

  const handleRegister = async (data: RegisterInput) => {
    try {
      await axios.post("/api/auth/register", {
        email: data.email,
        username: data.username,
        password: data.password
      });
      alert("User successfully registered");
      navigate("/login");
    } catch (err) {
      alert("Username or email already registered");
    }
  };

  const { mutate, isPending } = useMutation({ mutationFn: handleRegister });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-8 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#1f3354]">
          Register
        </h2>

        <form
          className="space-y-5"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              {...register("username")}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1f3354] focus:border-[#1f3354] outline-none"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-600 text-xs mt-1">
                Username is required.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              {...register("email")}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1f3354] focus:border-[#1f3354] outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                Email is required.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              {...register("password")}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1f3354] focus:border-[#1f3354] outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">
                Password is required.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#1f3354] text-white py-3 rounded-full font-semibold hover:bg-[#16253c] transition-colors"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-[#1f3354] font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;