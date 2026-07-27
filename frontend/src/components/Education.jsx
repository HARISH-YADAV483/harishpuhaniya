import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jroject from "../assets/hero.webp";
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
          <Link to="/" className="pf-nav-link"><span>00</span> Index</Link>
          <Link to="/projects" className="pf-nav-link"><span>01</span> Work</Link>
          <Link to="/education" className="pf-nav-link active"><span>02</span> Stack</Link>
          <Link to="/#contact" className="pf-nav-link"><span>03</span> Contact</Link>
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

/* ── Info Card ──────────────────────────────────────────── */
function InfoCard({ number, label, children, delay = 0 }) {
  const [inView, setInView] = useState(false);
  const ref = { current: null };
  useEffect(() => {
    const el = document.getElementById(`edu-card-${number}`);
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      id={`edu-card-${number}`}
      style={{
        padding: "32px 0",
        borderBottom: "1px solid var(--border)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <span style={{
          fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.16em",
          color: "var(--text-dim)", textTransform: "uppercase", paddingTop: 4, minWidth: 40
        }}>
          {String(number).padStart(2, "0")}
        </span>
        <div style={{ flex: 1 }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.18em",
            color: "var(--text-muted)", textTransform: "uppercase", display: "block", marginBottom: 12
          }}>{label}</span>
          {children}
        </div>
      </div>
    </div>
  );
}

const SKILLS = [
  { name: "JavaScript / TypeScript", pct: 82 },

  { name: "React.js", pct: 85 },

  { name: "Next.js", pct: 78 },

  { name: "HTML5 / CSS3", pct: 90 },

  { name: "Node.js / Express.js", pct: 78 },

  { name: "MongoDB", pct: 78 },

  { name: "PostgreSQL", pct: 75 },

  { name: "REST APIs", pct: 82 },

  { name: "JWT Authentication", pct: 80 },

  { name: "Git / GitHub", pct: 80 },

  { name: "Docker", pct: 65 },

  { name: "Python", pct: 60 },

  { name: "C / C++", pct: 72 },

  { name: "MERN Stack", pct: 82 },

  { name: "OpenAI / Gemini APIs", pct: 75 },

  { name: "Cloudinary", pct: 72 },

  { name: "Socket.IO", pct: 68 },

  { name: "Razorpay Integration", pct: 72 },

  { name: "Tiptap Editor", pct: 75 },

  { name: "Responsive Web Design", pct: 85 }

];

function SkillRow({ name, pct, delay = 0 }) {
  const [inView, setInView] = useState(false);
  const id = `skill-${name.replace(/\s/g, "")}`;
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div id={id} className={`pf-skill-row ${inView ? "pf-in-view" : ""}`} style={{ "--target-w": `${pct}%` }}>
      <span className="pf-skill-name">{name}</span>
      <div className="pf-skill-bar-track">
        <div className="pf-skill-bar-fill" />
      </div>
      <span className="pf-skill-pct">{pct}%</span>
    </div>
  );
}

const Education = () => (
  <div className="pf-root">
    <MiniNav active="stack" />
    <div className="pf-ticker">
      <div className="pf-ticker-track">
        {["B.Tech", "NIT Kurukshetra", "Information Technology", "MERN Stack", "Full-Stack", "AI/ML", "ESP32", "IoT",
          "B.Tech", "NIT Kurukshetra", "Information Technology", "MERN Stack", "Full-Stack", "AI/ML", "ESP32", "IoT"].map((t, i) => (
          <span key={i} className="pf-ticker-item">{t}</span>
        ))}
      </div>
    </div>

    <main className="pf-main">
      {/* Hero image */}
      <div style={{ position: "relative", height: "clamp(200px, 35vh, 380px)", overflow: "hidden" }}>
        <img
          src={jroject}
          alt="NIT Kurukshetra"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%) brightness(0.35)" }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px" }}>
          <span className="pf-section-label" style={{ display: "block", marginBottom: 12 }}>№ 002 — Academic Journey</span>
          <h1 style={{
            fontFamily: "var(--serif)", fontSize: "clamp(2.5rem, 7vw, 6rem)",
            fontWeight: 600, lineHeight: 0.9, display: "flex", alignItems: "baseline", gap: 12
          }}>
            <span style={{ color: "var(--text-primary)" }}>Education</span>
            <span style={{ color: "var(--accent)", fontStyle: "italic" }}>&amp; Stack</span>
          </h1>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderBottom: "1px solid var(--border)" }}
        className="edu-two-col">
        {/* Left — education cards */}
        <div style={{ padding: "40px 32px", borderRight: "1px solid var(--border)" }}>
          <span className="pf-section-label" style={{ display: "block", marginBottom: 24 }}>§ Credentials</span>

          <InfoCard number={1} label="Degree" delay={0}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 600, marginBottom: 6 }}>
              B.Tech — Information Technology
            </h3>
            <p style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 12, textTransform: "uppercase" }}>
              NIT Kurukshetra
            </p>
            <p style={{ fontFamily: "var(--sans)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              Currently pursuing my engineering degree at one of India's premier technical institutions,
              focusing on building a strong foundation in computer science and technology.
            </p>
          </InfoCard>

          <InfoCard number={2} label="Tech Interest" delay={100}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: 12 }}>
              Software & Systems
            </h3>
            <p style={{ fontFamily: "var(--sans)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              I am highly passionate about the ever-evolving world of technology. My journey is driven by a deep curiosity
              for how software shapes our future. I love exploring new programming languages and the logic behind complex systems.
            </p>
          </InfoCard>

          <InfoCard number={3} label="Current Focus" delay={200}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 600, marginBottom: 12 }}>
              Full MERN Stack Development
            </h3>
            <p style={{ fontFamily: "var(--sans)", fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
              I am currently dedicating my skill development to Web Development. My core expertise is built around the MERN
              stack — MongoDB, Express.js, React, Node.js — with a focus on creating production-ready, full-stack applications.
            </p>
          </InfoCard>
          <div style={{ marginTop: 48 }}>
            <span className="pf-section-label" style={{ display: "block", marginBottom: 20 }}>§ Highlights</span>
            {[
              "Founder & Director — Blogchit",
              
              "intership — Aditya and Ghanshyam Consultancy",
              "Built 4+ production-grade web apps",
              "Worked with AI APIs, IoT, Blockchain",
            ].map((item, i) => (
              <div key={i} style={{
                padding: "12px 0", borderBottom: "1px solid var(--border)",
                fontFamily: "var(--sans)", fontSize: "0.875rem", color: "var(--text-muted)",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: "0.55rem" }}>→</span>
                {item}
              </div>
            ))}
          </div>
        </div>


        {/* Right — skills */}
        <div style={{ padding: "40px 32px" }}>
          <span className="pf-section-label" style={{ display: "block", marginBottom: 24 }}>§ Technical Stack</span>
          <div className="pf-skill-list">
            {SKILLS.map((s, i) => (
              <SkillRow key={s.name} name={s.name} pct={s.pct} delay={i * 80} />
            ))}
          </div>

          {/* Certifications / extras */}
          
        </div>
      </div>

      <footer className="pf-footer">
        <span className="pf-footer-copy">© {new Date().getFullYear()} Harish Puhaniya</span>
        <Link to="/" className="pf-browse-btn" style={{ fontSize: "0.55rem" }}>← Back to Home</Link>
      </footer>
    </main>

    {/* Responsive two-col */}
    <style>{`
      @media (max-width: 768px) {
        .edu-two-col { grid-template-columns: 1fr !important; }
        .edu-two-col > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
      }
    `}</style>
  </div>
);

export default Education;