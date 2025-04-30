import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
// Import icons (make sure you have @heroicons/react installed)
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"; // Or /24/solid

export type LoginInput = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>();

  const handleLogin = async (data: LoginInput) => {
    try {
      const res = await axios.post<{ access_token: string; user: { email: string; username: string } }>(
        "/api/auth/login",
        {
          email: data.email,
          password: data.password
        }
      );

      console.log("Login response:", res.data); // Debug log

      if (res.data?.access_token) {
        login(res.data.access_token);
        console.log("Token saved, redirecting to home..."); // Debug log
        navigate("/home", { replace: true });
      } else {
        console.error("No access token in response:", res.data); // Debug log
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm border border-gray-300 rounded-lg p-6 bg-white">
        {isPending && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-20 rounded-lg">
            <div className="w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="text-center mb-6">
          <span className="border border-gray-300 rounded px-4 py-1">
            Login
          </span>
        </div>

        <form 
          className="space-y-4"
          onSubmit={handleSubmit((data) => mutate(data))}
          noValidate
        >
          <div>
            <div className="flex items-center border border-gray-300 rounded">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mx-3" />
              <input
                type="email"
                className="w-full p-2 outline-none"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center border border-gray-300 rounded">
              <LockClosedIcon className="h-5 w-5 text-gray-400 mx-3" />
              <input
                type="password"
                className="w-full p-2 outline-none"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#1f3354] text-white py-3 rounded-full font-semibold hover:bg-[#16253c] transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <span
            className="text-[#1f3354] font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Daftar
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;