import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signin";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import AdminSignUp from './pages/auth/AdminSignUp'
function App() {
  return (
    <div className="w-full overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-green-50">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup/admin" element={<AdminSignUp/>} />
        {/* A fallback route for any non-existent paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
