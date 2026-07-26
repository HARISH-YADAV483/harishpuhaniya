import { useEffect, useState } from "react";
import { getHello } from "./api";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomeNew from "./components/HomeNew";
import BlogPage from "./components/blog";
import Photo from "./components/photo";
import Education from "./components/Education";
import Portfolio from "./components/Portfolio";
import CursorFollower from "./components/CursorFollower";


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
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getHello().then(setMsg);
  }, []);

  return (
    <BrowserRouter>
      <CursorFollower />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomeNew />} />
        <Route path="/contact" element={<BlogPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Portfolio />} />
        <Route path="/photos" element={<Photo />} />
      </Routes>
    </BrowserRouter>
  );
}