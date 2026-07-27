import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import hostelImg from "../assets/hostel.webp";
import projectImg from "../assets/project.webp";
import personalImg from "../assets/personal.webp";
import blogchitImg from "../assets/image copy 5.webp";
import "./PortfolioNew.css";

/* ── shared mini-navbar ─────────────────────────────────── */
function MiniNav({ active }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
  );
  useEffect(() => {
    const id = setInterval(() =>
      setTime(new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      })), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <nav className="pf-navbar">
        <div className="pf-nav-left">
          <Link to="/" className="pf-nav-logo">Harish Puhaniya</Link>
          {/* <span className="pf-nav-breadcrumb">Harish / Puhaniya</span> */}
        </div>
        <div className="pf-nav-center">
          <div className="pf-nav-dot" />
          <span className="pf-nav-status">Co-founder, Xenotix · CTO, Verdicto</span>
          <span className="pf-nav-time">IST {time}</span>
        </div>
        <div className="pf-nav-right">
          <Link to="/" className={`pf-nav-link ${active === "index" ? "active" : ""}`}><span>00</span> Index</Link>
          <Link to="/projects" className={`pf-nav-link ${active === "work" ? "active" : ""}`}><span>01</span> Work</Link>
          <Link to="/education" className={`pf-nav-link ${active === "stack" ? "active" : ""}`}><span>02</span> Stack</Link>
          <Link to="/#contact" className={`pf-nav-link ${active === "contact" ? "active" : ""}`}><span>03</span> Contact</Link>
        </div>
        <button className="pf-nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`pf-mobile-menu ${open ? "open" : ""}`}>
        {[["Index", "/"], ["Work", "/projects"], ["Education", "/education"], ["Photos", "/photos"], ["Contact", "/#contact"]].map(([label, href]) => (
          <Link key={label} to={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </div>
    </>
  );
}

const PROJECTS = [
  {
    id: 1,
    title: "Campus Management System",
    description: "A hostel web portal built with Express and Node.js. Features online mess rebate, complaint filing, and group chat for hostel residents. Login via student ID OTP.",
    image: hostelImg,
    link: "https://dev-topaz.onrender.com",
    tags: ["Express.js", "Node.js", "MongoDB", "Tailwind"],
    year: "2024",
  },
  {
    id: 2,
    title: "Scam-Protection App",
    description: "ScamShield is a full-stack platform that detects and prevents online scams. It evaluates suspicious content using AI, verifies domains, and generates a real-time scam score.",
    image: projectImg,
    link: "https://hackrustfinal.onrender.com/",
    tags: ["React", "API", "CSS", "AI", "Express.js"],
    year: "2024",
  },
  {
    id: 3,
    title: "BlogChit",
    description: "A full-stack blogging and social networking platform combining content creation, community engagement, and real-time communication. Built with React, Node.js, MongoDB, and Socket.io.",
    image: blogchitImg,
    link: "https://blogchit.onrender.com/",
    tags: ["React", "Socket.io", "MongoDB", "Express.js"],
    year: "2025",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built with React featuring dark editorial design, animated sections, and a backend contact form.",
    image: personalImg,
    link: "#",
    tags: ["React", "CSS", "Express", "Vite"],
    year: "2026",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="pf-project-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="pf-project-num">{String(index + 1).padStart(2, "0")}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.52rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>
          {project.year}
        </span>
      </div>
      <img src={project.image} alt={project.title} className="pf-project-img" />
      <h3 className="pf-project-title">{project.title}</h3>
      <p className="pf-project-desc">{project.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.1em",
            color: "var(--accent)", border: "1px solid rgba(199,82,42,0.3)",
            padding: "3px 8px", textTransform: "uppercase",
          }}>{t}</span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noreferrer" className="pf-project-link">
        View Project →
      </a>
    </div>
  );
}

const Portfolio = () => (
  <div className="pf-root">
    <MiniNav active="work" />
    {/* Ticker */}
    <div className="pf-ticker">
      <div className="pf-ticker-track">
        {["React", "Node.js", "MongoDB", "Express.js", "Socket.io", "AI", "Tailwind", "Vite", "CSS", "Next.js",
          "React", "Node.js", "MongoDB", "Express.js", "Socket.io", "AI", "Tailwind", "Vite", "CSS", "Next.js"].map((t, i) => (
          <span key={i} className="pf-ticker-item">{t}</span>
        ))}
      </div>
    </div>

    <main className="pf-main">
      {/* Header */}
      <section style={{ padding: "40px 32px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
          <div>
            <span className="pf-section-label" style={{ display: "block", marginBottom: 20 }}>
              № 001 — Selected Work
            </span>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(3.5rem, 9vw, 8rem)",
              fontWeight: 600, lineHeight: 0.9, display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap"
            }}>
              <span style={{ color: "var(--text-primary)" }}>The</span>
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>archive</span>
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="pf-archive-count">{PROJECTS.length} Entries</span>
            <span className="pf-archive-years" style={{ display: "block" }}>2023 — 2026</span>
          </div>
        </div>

        <div className="pf-projects-grid" style={{ marginTop: 0, marginBottom: 48 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </section>

      {/* Footer strip */}
      <footer className="pf-footer">
        <span className="pf-footer-copy">© {new Date().getFullYear()} Harish Puhaniya</span>
        <Link to="/" className="pf-browse-btn" style={{ fontSize: "0.55rem" }}>← Back to Home</Link>
      </footer>
    </main>
  </div>
);

export default Portfolio;
