import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PenTool, Code2, Smartphone, BrainCircuit, ArrowRight, Download
} from "lucide-react";
import logu from "../assets/image copy 2.webp";
import pogu from "../assets/pgaph.webp";
import jogu from "../assets/pgraphy.webp";
import roject from "../assets/jioo.jpeg";
import oject from "../assets/image copy 4.webp";
import ject from "../assets/image copy 5.webp";
import cv from "../assets/harishpuhaniyacv.pdf";
import "./PortfolioNew.css";

/* ── Ticker items (duplicated for seamless loop) ────────── */
const TICKER_ITEMS = [
  "Next.js", "React", "Node.js", "MongoDB",
  "Vercel", "GPT API", "AI",
  "Razorpay",
  "TypeScript", "PostgreSQL", "Docker",
];

/* ── Skills ─────────────────────────────────────────────── */
const SKILLS = [
  { name: "Next.js", pct: 90 },
  { name: "React.js", pct: 92 },
  { name: "Node.js", pct: 88 },
  { name: "SQL", pct: 50 },
  { name: "MongoDB", pct: 80 },

  { name: "Docker", pct: 75 },
  { name: "Deployment", pct: 80 },
  { name: "Python", pct: 60 },
    { name: "DSA", pct: 85 },
];

/* ── Services ───────────────────────────────────────────── */
const SERVICES = [
  { icon: <PenTool size={26} />, title: "UI / UX Design" },
  { icon: <Code2 size={26} />, title: "Web Development" },
  { icon: <Smartphone size={26} />, title: "Responsive Design" },
  { icon: <BrainCircuit size={26} />, title: "AI Development" },
];

/* ── Projects ───────────────────────────────────────────── */
const PROJECTS = [
  {
    img: roject,
    title: "Scamshield",
    desc: "A cybersecurity app that protects users from scam calls, phishing links, and fraudulent messages with real-time alerts.",
  },
  {
    img: oject,
    title: "Hostel Web-Portal",
    desc: "A modern hostel portal for students to discover stays, check availability, and book seamlessly.",
  },
  {
    img: ject,
    title: "BlogCHIT",
    desc: "A social blogging platform where people write blogs, share ideas, join communities, and chat with like-minded users.",
  },
];

/* ── Live clock ─────────────────────────────────────────── */
function useClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
  );
  useEffect(() => {
    const id = setInterval(() =>
      setTime(new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      })), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* ── Intersection helper ────────────────────────────────── */
function useInView(ref, { threshold = 0.15, once = true } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) obs.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, once]);
  return inView;
}

/* ── Skill Row ──────────────────────────────────────────── */
function SkillRow({ name, pct }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div
      ref={ref}
      className={`pf-skill-row ${inView ? "pf-in-view" : ""}`}
      style={{ "--target-w": `${pct}%` }}
    >
      <span className="pf-skill-name">{name}</span>
      <div className="pf-skill-bar-track">
        <div className="pf-skill-bar-fill" />
      </div>
      <span className="pf-skill-pct">{pct}%</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function HomeNew() {
  const time = useClock();
  const [menuOpen, setMenuOpen] = useState(false);

  /* contact form */
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const msgRef = useRef(null);
  const [sendStatus, setSendStatus] = useState("idle");

  const handleSend = async () => {
    const fd = {
      name: nameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      number: phoneRef.current.value,
      message: msgRef.current.value,
    };
    if (!fd.name || !fd.lastname || !fd.email) {
      alert("Please fill in Name, Lastname, and Email.");
      return;
    }
    setSendStatus("sending");
    try {
      const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
      await axios.post(`${BASE}/api/contact`, fd);
      setSendStatus("success");
      [nameRef, lastnameRef, emailRef, phoneRef, msgRef].forEach(r => {
        if (r.current) r.current.value = "";
      });
      setTimeout(() => setSendStatus("idle"), 3000);
    } catch {
      setSendStatus("idle");
      alert("Failed to send. Please try again.");
    }
  };

  /* scroll-based fade-up for generic elements */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        e.target.classList.toggle("pf-in-view", e.isIntersecting);
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".pf-fade-up").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="pf-root">
      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <nav className="pf-navbar">
        <div className="pf-nav-left">
          <Link to="/" className="pf-nav-logo">Harish Puhaniya</Link>
          {/* <span className="pf-nav-breadcrumb">Harish / Puhaniya</span> */}
        </div>

        <div className="pf-nav-center">
          <div className="pf-nav-dot" />
          <span className="pf-nav-status">    Founder, BlogChit ·  Intern, Aditya Ghanshyam Consultancy</span>
          <span className="pf-nav-time">IST {time}</span>
        </div>

        <div className="pf-nav-right">
          <a href="#index" className="pf-nav-link" onClick={() => document.getElementById("pf-hero")?.scrollIntoView({ behavior: "smooth" })}>
           Home
          </a>
          <a href="#archive" className="pf-nav-link" onClick={() => document.getElementById("pf-archive")?.scrollIntoView({ behavior: "smooth" })}>
          Projects
          </a>
          <a href="#stack" className="pf-nav-link" onClick={() => document.getElementById("pf-stack")?.scrollIntoView({ behavior: "smooth" })}>
            Education
          </a>
          <a href="#contact" className="pf-nav-link" onClick={() => document.getElementById("pf-contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact
          </a>
        </div>

        <button
          className="pf-nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── MOBILE MENU ─────────────────────────────────────── */}
      <div className={`pf-mobile-menu ${menuOpen ? "open" : ""}`}>
        {["Index", "Work", "Stack", "Education", "Contact"].map(label => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── TICKER ──────────────────────────────────────────── */}
      <div className="pf-ticker">
        <div className="pf-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="pf-ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <main className="pf-main">

        {/* ══ HERO ═════════════════════════════════════════════ */}
        <section className="pf-hero" id="pf-hero">
          <div className="pf-hero-top">
            <span className="pf-section-label">№ 001 — Introduction</span>
            <span className="pf-hero-vol">Portfolio / Vol. IV / 2026</span>
          </div>

          <div className="pf-hero-body">
            <div className="pf-hero-names">
              <span className="pf-name-first">Harish</span>
              <div className="pf-name-last-wrap">
                <span className="pf-name-last">Puhaniya</span>
                {/* <span className="pf-name-sup">1</span> */}
              </div>
            </div>

            {/* Crosshair */}
            <div className="pf-crosshair">
              <div className="pf-crosshair-dot" />
            </div>

            {/* Photo */}
            <div className="pf-photo-block pf-photo-block-desktop">
              <img src={logu} alt="Harish Puhaniya" className="pf-photo-img" />
              <span className="pf-photo-caption-label">Photograph</span>
              <p className="pf-photo-caption-text">
                The author at work,<br />2025. Kurukshetra, IN.
              </p>
            </div>
          </div>

          {/* Prospectus + Currently */}
          <div className="pf-hero-bottom">
            <div>
              <p className="pf-prospectus-label">Prospectus</p>
              <p className="pf-prospectus-text">
                B.Tech IT student at <em>NIT Kurukshetra</em>. Building scalable web
                applications with the <em>MERN stack</em>, AI-powered solutions, and
                real-world client projects. Passionate about software engineering,
                cybersecurity, and creating products that solve real problems. From
                Panipat, Haryana.
              </p>
            </div>

            <div className="pf-currently">
              <p className="pf-currently-title">Currently</p>
              {[
                ["Running", "BlogChit"],
                ["Internship", "Aditya Ghanshyam Consultancy"],
                ["Studying", "NIT Kurukshetra"],
              ].map(([k, v]) => (
                <div className="pf-currently-row" key={k}>
                  <span className="pf-currently-key">{k}</span>
                  <span className="pf-currently-val">{v}</span>
                </div>
              ))}
            </div>

            {/* Portrait photo — visible on mobile below the Currently table */}
            <div className="pf-photo-block-mobile">
              <img
                src={logu}
                alt="Harish Puhaniya"
                className="pf-photo-img"
                style={{ width: "100%", maxWidth: "280px" }}
              />
              <span className="pf-photo-caption-label" style={{ marginTop: 6 }}>Photograph</span>
              <p className="pf-photo-caption-text">
                The author at work,<br />2025. Kurukshetra, IN.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pf-hero-bar">
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <button
                className="pf-browse-btn"
                onClick={() => document.getElementById("pf-archive")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Selected Work ↘
              </button>
              <span style={{ color: "var(--text-dim)", fontFamily: "var(--mono)", fontSize: "0.55rem" }}>·</span>
              <a href="mailto:harishpuhaniya@gmail.com" className="pf-browse-btn">
                Say Hello
              </a>
            </div>
            <span className="pf-scroll-hint">Scroll · §02 Selected Work →</span>
          </div>
        </section>

        {/* ══ ARCHIVE ══════════════════════════════════════════ */}
        <section className="pf-archive pf-fade-up" id="pf-archive">
          <div className="pf-archive-top">
            <div>
              <span className="pf-section-label" style={{ display: "block", marginBottom: 20 }}>
                № 002 — Selected Work
              </span>
              <h2 className="pf-archive-heading">
                <span className="static-word">The</span>
                <span className="italic-word">archive</span>
              </h2>
            </div>
            <div className="pf-archive-meta">
              <span className="pf-archive-count">3 Entries</span>
              <span className="pf-archive-years">2023 — 2026</span>
            </div>
          </div>
          <div className="pf-archive-crosshair">
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 6, height: 6, borderRadius: "50%",
              border: "1.5px solid rgba(240,236,228,0.3)"
            }} />
          </div>

          <div className="pf-projects-grid">
            {PROJECTS.map((p, i) => (
              <div className="pf-project-card" key={i}>
                <span className="pf-project-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img src={p.img} alt={p.title} className="pf-project-img" />
                <h3 className="pf-project-title">{p.title}</h3>
                <p className="pf-project-desc">{p.desc}</p>
                <Link to="/projects" className="pf-project-link">
                  View Project →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
            <Link to="/projects" className="pf-browse-btn" style={{ color: "var(--accent)" }}>
              View All Projects →
            </Link>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════════════════ */}
        <section className="pf-services pf-fade-up">
          <div className="pf-services-header">
            <span className="pf-section-label" style={{ display: "block", marginBottom: 12 }}>
              § Services
            </span>
            <h2 className="pf-services-title">
              What I <span>Do</span>
            </h2>
          </div>
          <div className="pf-services-grid">
            {SERVICES.map((s, i) => (
              <div className="pf-service-item" key={i}>
                <div className="pf-service-icon">{s.icon}</div>
                <h3 className="pf-service-title">{s.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STACK / SKILLS ════════════════════════════════════ */}
        <section className="pf-stack" id="pf-stack">
          <div className="pf-stack-header pf-fade-up">
            <span className="pf-section-label" style={{ display: "block", marginBottom: 12 }}>
              № 003 — Stack
            </span>
            <h2 className="pf-stack-title">
              Tech <span>Skills</span>
            </h2>
          </div>
          <div className="pf-skill-list">
            {SKILLS.map((s, i) => (
              <SkillRow key={i} name={s.name} pct={s.pct} />
            ))}
          </div>
        </section>

        {/* ══ EDUCATION + HOBBIES ═══════════════════════════════ */}
        <section className="pf-edu pf-fade-up">
          <div>
            <p className="pf-edu-label">§ Education</p>
            <h3 className="pf-edu-title">NIT Kurukshetra</h3>
            <p className="pf-edu-text">
              Currently pursuing B.Tech in Information Technology at one of
              India's premier technical institutions. Focused on building a
              strong foundation in computer science and full-stack development.
              Passionate about the ever-evolving world of technology.
            </p>
            <Link to="/education" className="pf-edu-link">
              Explore More →
            </Link>
          </div>

          <div>
            <p className="pf-edu-label" style={{ marginBottom: 0 }}>§ Interests</p>
            <div className="pf-hobby-card">
              <img src={pogu} alt="Photography" className="pf-hobby-img" />
              <div>
                <h4 className="pf-hobby-title">Photography</h4>
                <p className="pf-hobby-desc">
                  Capturing moments that tell a story — preserving memories
                  and exploring beauty through a lens.
                </p>
                <Link to="https://www.instagram.com/harishpuhaniya/" className="pf-edu-link">See Photos →</Link>
              </div>
            </div>
            <div className="pf-hobby-card">
              <img src={jogu} alt="Blogs" className="pf-hobby-img" />
              <div>
                <h4 className="pf-hobby-title">Blogging</h4>
                <p className="pf-hobby-desc">
                  Sharing ideas, knowledge, and experiences through creative
                  writing, tutorials, and insights on technology.
                </p>
                <a
                  href="https://harishpuhaniya.blogspot.com/"
                  className="pf-edu-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read Blogs →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════ */}
        <section className="pf-contact pf-fade-up" id="pf-contact">
          <div className="pf-contact-left">
            <h2>Get in <span>Touch</span></h2>
            <p>
              If you'd like to get in touch, feel free to reach out anytime.
              I'm always open to discussing new ideas, projects, and
              collaborations.
            </p>
            <p>Your feedback and suggestions are highly appreciated.</p>
            <div className="pf-contact-info">
              <span>+91 8396029503</span>
              <span>harishpuhaniya@gmail.com</span>
            </div>
            <div style={{ marginTop: 24 }}>
              <a
                href={cv}
                download="harishpuhaniyacv.pdf"
                className="pf-form-btn"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
              >
                Download CV <Download size={14} />
              </a>
            </div>
          </div>

          <form className="pf-contact-form" onSubmit={e => { e.preventDefault(); handleSend(); }}>
            <div className="pf-form-row">
              <input
                type="text"
                placeholder="Name"
                ref={nameRef}
                className="pf-form-input"
                required
              />
              <input
                type="text"
                placeholder="Lastname"
                ref={lastnameRef}
                className="pf-form-input"
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="pf-form-input"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              ref={phoneRef}
              className="pf-form-input"
            />
            <input
              type="text"
              placeholder="Message"
              ref={msgRef}
              className="pf-form-input"
            />
            <button
              type="submit"
              className="pf-form-btn"
              disabled={sendStatus === "sending"}
            >
              {sendStatus === "idle" && "Send Message →"}
              {sendStatus === "sending" && "Sending..."}
              {sendStatus === "success" && "Sent ✓"}
            </button>
          </form>
        </section>

        {/* ══ FOOTER ════════════════════════════════════════════ */}
        <footer className="pf-footer">
          <span className="pf-footer-copy">
            © {new Date().getFullYear()} Harish Puhaniya · All rights reserved
          </span>
          <button
            className="pf-footer-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top ↑
          </button>
        </footer>

      </main>
    </div>
  );
}
