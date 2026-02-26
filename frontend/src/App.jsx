import { useEffect, useState } from "react";
import { getHello } from "./api";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/blog";
import Education from "./components/Education";
import Portfolio from "./components/Portfolio";
import logi from "./assets/cross.png";

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
}

export default function App() {
  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(prev => !prev);
  };

  const [msg, setMsg] = useState("");

  useEffect(() => {
    getHello().then(setMsg);
  }, []);


  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className={`menubar ${showDiv ? "active" : ""}`}>
        <img src={logi} alt="ScamShield" className="logi" onClick={toggleDiv} />
        <div className="linlu">
          <Link to="/#education" className="nav-lin" onClick={toggleDiv}>Education</Link>
          <Link to="/#portfolio" className="nav-lin" onClick={toggleDiv}>Projects</Link>
          <Link to="/#photography" className="nav-lin" onClick={toggleDiv}>photography</Link>
          <Link to="/#blogs" className="nav-lin" onClick={toggleDiv}>Blogs</Link>
          <Link to="/#contact" className="nav-lin" onClick={toggleDiv}>Contact</Link>
        </div>
      </div>
      <Navbar toggleDiv={toggleDiv} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}