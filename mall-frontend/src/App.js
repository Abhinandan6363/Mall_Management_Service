import React, { useState } from "react";
import Shop from "./Shop";
import Customer from "./Customer";
import Order from "./Order";
import "./App.css";
import Guest from "./Guest";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  // 🔥 STATE FOR NAVIGATION
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 shadow-sm">
        
        <span className="navbar-brand fw-bold">
          🏢 Mall Dashboard
        </span>

        {/* 🔥 CLICKABLE MENU */}
        <div className="ms-auto d-flex align-items-center gap-4 text-white">

          <span 
            className={`nav-link ${activePage==="dashboard" ? "active" : ""}`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </span>

          <span 
            className={`nav-link ${activePage==="shops" ? "active" : ""}`}
            onClick={() => setActivePage("shops")}
          >
            Shops
          </span>

          <span 
            className={`nav-link ${activePage==="customers" ? "active" : ""}`}
            onClick={() => setActivePage("customers")}
          >
            Customers
          </span>

<span 
            className={`nav-link ${activePage==="orders" ? "active" : ""}`}
            onClick={() => setActivePage("orders")}
          >
            Orders
          </span>

          <span 
            className={`nav-link ${activePage==="guests" ? "active" : ""}`}
            onClick={() => setActivePage("guests")}
          >
            Guest
          </span>

        </div>

        <button className="btn btn-success ms-3">
          👤 Admin
        </button>

      </nav>

      {/* 🔥 MAIN CONTENT */}
      <div className="container-fluid mt-4 px-4">

        {/* DASHBOARD VIEW */}
        {activePage === "dashboard" && (
          <>
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card p-3 shadow"><Shop /></div>
              </div>

              <div className="col-lg-6">
                <div className="card p-3 shadow"><Customer /></div>
              </div>
            </div>

<div className="row g-4 mt-4">
              <div className="col-lg-6">
                <div className="card p-3 shadow"><Order /></div>
              </div>
              <div className="col-lg-6">
                <div className="card shadow-lg p-3"><Guest /></div>
              </div>
            </div>
          </>
        )}

        {/* SHOPS ONLY */}
        {activePage === "shops" && (
          <div className="card p-3 shadow">
            <Shop />
          </div>
        )}

        {/* CUSTOMERS ONLY */}
        {activePage === "customers" && (
          <div className="card p-3 shadow">
            <Customer />
          </div>
        )}

{/* ORDERS ONLY */}
        {activePage === "orders" && (
          <div className="card p-3 shadow">
            <Order />
          </div>
        )}

        {/* GUEST ONLY */}
        {activePage === "guests" && (
          <div className="card p-3 shadow">
            <Guest />
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="footer text-center py-3 mt-4">
        © 2026 Mall Management System
      </footer>

    </div>
  );
}

export default App;