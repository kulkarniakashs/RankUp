import React, { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import RoleTabs from "../../components/auth/RoleTabs";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import type { Role } from "../../types/roles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

export default function Signup() {
  const [role, setRole] = useState<Role>("STUDENT");
  const [fullname, setFullname] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const navigate = useNavigate();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log({
        fullName: fullname,
        email: email,
        password: password,
        role: role,
      });
      let res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/signup`,
        {
          fullName: fullname,
          email: email,
          password: password,
          role: role,
        },
      );
      localStorage.setItem("token", res.data.accessToken);
      let { role1 } = decodeToken(res.data.accessToken) as { role1: string };
      switch (role1) {
        case "STUDENT": {
          navigate("/student/dashboard");
          break;
        }
        case "TEACHER": {
          navigate("/teacher/dashboard");
          break;
        }
        case "ADMIN": {
          navigate("/admin/dashboard");
          break;
        }
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <AuthLayout
      title="Create your account ✨"
      subtitle="Start learning from the best teachers"
    >
      {/* Admin signup disabled */}
      <RoleTabs role={role} setRole={setRole} allowAdmin={false} />

      <form className="space-y-2" onSubmit={onSubmit}>
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          required
          onChange={(e) => {
            setFullname(e.target.value);
          }}
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <AuthButton type="submit">Create Account</AuthButton>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
    </AuthLayout>
  );
}
