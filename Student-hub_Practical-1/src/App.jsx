import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const skillslist = ["HTML", "CSS", "JavaScript", "React"];

  return (
    <div className={darkMode ? "dark" : "light"}>
      <NavBar />

      <Header
        name="Manthan Chavda"
        themeColor="#1976d2"
      />

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <Routes>
        <Route path="/" element={<Home skillslist={skillslist} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;