import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import About from "./components/about/About";
import AllEvents from "./components/allevents/AllEvents"; // ✅ Import added
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import BuyTicket from "./components/buyticket/BuyTicket";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="buy-ticket" element={<BuyTicket />} />
          <Route path="all-events" element={<AllEvents />} /> {/* ✅ Route works now */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="about" element={<About />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
