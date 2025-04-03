import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ProfileProvider } from "../context/ProfileContext";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>

            {/* Admin only routes */}
            <Route element={<PrivateRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            {/* Redirect to home for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
