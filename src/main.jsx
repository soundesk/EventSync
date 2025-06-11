import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import App from "./App";
import Layout from "./Layout";
import About from "./components/about/About";
import AllEvents from "./components/allevents/AllEvents";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import BuyTicket from "./components/buyticket/BuyTicket";
import Profile from "./components/profile/Profile";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="buy-ticket" element={<BuyTicket />} />
            <Route path="all-events" element={<AllEvents />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="about" element={<About />} />
            <Route path="profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="create-event" element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
