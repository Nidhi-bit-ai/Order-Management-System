import { FaBoxOpen } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
        const response = await loginService(data);

        login(response.token, response.user);

        navigate("/dashboard");
    } catch (error) {
        alert(error.response?.data?.message || "Login failed");
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full">
            <FaBoxOpen className="text-white text-3xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center">
          OMS Admin
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Sign in to continue
        </p>

        {/* Form */}
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
        >

          {/* Email */}

          <div>
            <label className="font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <MdEmail className="text-gray-500 text-xl" />

              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full p-3 outline-none"
                {...register("email", {
                    required: "Email is required",
                })}
              />
            </div>
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
                </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-lg mt-2 px-3">
              <MdLock className="text-gray-500 text-xl" />

              <input
                type="password"
                placeholder="********"
                className="w-full p-3 outline-none"
                {...register("password", {
                    required: "Password is required",
                })}
              />
            </div>
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                </p>
            )}
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition text-white py-3 rounded-lg font-semibold"
            >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;