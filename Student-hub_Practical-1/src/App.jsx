import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Contact from "./Pages/Contact";

import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <NavBar />

      <Header
        name="Manthan Chavda"
        themeColor="#1976d2"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;