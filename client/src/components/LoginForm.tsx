import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schemas/login";
import { z } from "zod";
import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { Link, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastUtils";
import { useEffect } from "react";

type LoginFormInputs = z.infer<typeof LoginSchema>;

export default function LoginForm() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields }
  } = useForm<LoginFormInputs>({
    mode : "all",
    resolver: zodResolver(LoginSchema),
    defaultValues:{
        email: '',
        password: ''
    }
  });

  useEffect(()=>{
    const user_id = localStorage.getItem("user_id");
    const auth_token = localStorage.getItem("auth_token");

    if(user_id && auth_token){
      navigate("/places");
    }
  })

  const onSubmit = async (data: LoginFormInputs) => {
    
    axios.post<ApiResponse>('http://localhost:5000/api/users/login', data)
    .then((res)=>{
        console.log("Login Response:", res.data);
        showSuccess('Login successful!');
        const userId = res.data?.user?.id;
        console.log("User ID:", userId);
        if (userId) {
            localStorage.setItem("user_id", userId);
        }
        const token = res.data?.user?.token;
        console.log("Token:", token);
        if (token) {
          localStorage.setItem("auth_token", token);
        }
        navigate("/places");
    })
    .catch((err)=>{
        console.error('Login error:', err.response?.data.message || err.message);
        showError(err.response?.data.message || 'Login failed. Please try again.');
    });
  };

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: "420px" }}>
        <h1 className="fw-bold text-center mb-4" style={{ color: "#d4527b" }}>
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <input
              className={`form-control rounded-4 ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email ? (
              <div className="invalid-feedback">{errors.email.message}</div>
            )
            :(
              touchedFields.email && <div className="text-green-600">Email is valid</div>
            )
          }
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control rounded-4 ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password ? (
              <div className="invalid-feedback">{errors.password.message}</div>
            ):(
              touchedFields.password && <div className="text-green-600">Password is valid</div>
            )
          }
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold py-2 rounded-4"
            disabled={isSubmitting}
            style={{
              background: "linear-gradient(135deg, #d3be52, #d4527b)",
              color: "white",
              border: "none"
            }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none" style={{ color: "#d4527b" }}>
                Sign Up
            </Link>
        </p>
      </div>
    </main>
  );
}
