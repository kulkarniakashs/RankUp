import { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import RoleTabs from "../../components/auth/RoleTabs";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import axios from "axios";
import type { Role } from "../../types/roles";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("STUDENT");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
     console.log({
        email: email,
        password: password,
      })
      let res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`, {
        email: email,
        password: password
      });
      localStorage.setItem('token', res.data.accessToken);
      console.log(res.data);
      navigate('student/course');
    } catch (error) {
        alert(error);
    }
  }
  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Login to continue learning"
    >
      <RoleTabs role={role} setRole={setRole} />

      <form className="space-y-2" onSubmit={onSubmit}>
        <AuthInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          required
          onChange={(e)=>setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          onChange={(e)=>setPassword(e.target.value)}
        />

        <div className="text-right text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <AuthButton type="submit">Login</AuthButton>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <a
          href="/auth/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
}
