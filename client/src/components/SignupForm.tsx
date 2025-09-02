import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../../schemas/signup";
import { z } from "zod";
import axios from "axios";
import { ApiResponse } from "../../types/ApiResponse";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastUtils";

type SignupFormInputs = z.infer<typeof SignupSchema>;

export default function SignupForm() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignupFormInputs>({
    mode : "all",
    resolver: zodResolver(SignupSchema),
    defaultValues:{
        userName: "",
        email: "",
        mobileNo: "",
        password: "",
        confirmPassword: ""
    }
  });

  const onSubmit = async (data: SignupFormInputs) => {
    console.log("Signup Data:", data);
    axios.post<ApiResponse>('http://localhost:5000/api/users/signup', data)
        .then((res)=>{
            showSuccess('SignUp successful!');
            const userId = res.data?.user?.id;
            if (userId) {
              localStorage.setItem("user_id", userId);
            }
            const token = res.data?.user?.token;
            if (token) {
              localStorage.setItem("auth_token", token);
            }
            navigate("/places");
        })
        .catch((err)=>{
            console.error('Login error:', err.response?.data.message || err.message);
            showError(err.response?.data.message || 'SignUp failed. Please try again.');
        });
  };

  return (
    <main className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: "420px" }}>
        <h1 className="fw-bold text-center mb-4" style={{ color: "#d4527b" }}>
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-3">
            <input
              type="text"
              className={`form-control rounded-4 ${errors.userName ? "is-invalid" : ""}`}
              placeholder="Enter your username"
              {...register("userName")}
            />
            {errors.userName ? (
              <div className="invalid-feedback">{errors.userName.message}</div>
            ) : (
                touchedFields.userName && <div className="text-green-600">Username is valid</div>
            )
        }
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className={`form-control rounded-4 ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email ? (
              <div className="invalid-feedback">{errors.email.message}</div>
            ): (
                touchedFields.email && <div className="text-green-600">Email is valid</div>
            )
        }
          </div>

          {/* Phone */}
          <div className="mb-3">
            <input
              type="tel"
              className={`form-control rounded-4 ${errors.mobileNo ? "is-invalid" : ""}`}
              placeholder="Enter your phone number"
              {...register("mobileNo")}
            />
            {errors.mobileNo ? (
              <div className="invalid-feedback">{errors.mobileNo.message}</div>
            )
            : (
                touchedFields.mobileNo && <div className="text-green-600">Phone number is valid</div>
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
            )
            : (
                touchedFields.password && <div className="text-green-600">Password is valid</div>
            )
            }
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <input
              type="password"
              className={`form-control rounded-4 ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
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
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </main>
  );
}
