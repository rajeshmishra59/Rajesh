// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import BookSpaceForm from "./pages/spaces/BookSpaceForm";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Root URL redirect to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* Other Routes */}
        <Route path="/book-space" element={<BookSpaceForm />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
