import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import BuyTicket from "./components/buyticket/BuyTicket";
import AllEvents from "./components/allevents/AllEvents"; // ✅ Import added
import "./index.css";
import Login from "./components/authentification/Login";
import Signup from "./components/authentification/Signup";
import About from "./components/about/About";
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
