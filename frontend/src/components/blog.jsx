import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jogu from "../assets/blog.jpeg";
import "./PortfolioNew.css";

/* ── shared mini-navbar ─────────────────────────────────── */
function MiniNav() {
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
          <Link to="/education" className="pf-nav-link"><span>02</span> Stack</Link>
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

/* ── Sample blog posts ──────────────────────────────────── */
const POSTS = [
  {
    id: 1,
    title: "Why I chose the MERN stack over everything else",
    excerpt: "A deep dive into the ecosystem, tooling, and real-world advantages of building full-stack apps with MongoDB, Express, React, and Node.js.",
    date: "Mar 2025",
    tag: "Dev",
    readTime: "6 min read",
    link: "https://harishpuhaniya.blogspot.com/",
  },
  {
    id: 2,
    title: "Building a real-time scam detector with AI",
    excerpt: "How I integrated GPT APIs and domain verification to create ScamShield — a tool that scores phishing links and alerts users in real-time.",
    date: "Jan 2025",
    tag: "AI",
    readTime: "8 min read",
    link: "https://harishpuhaniya.blogspot.com/",
  },
  {
    id: 3,
    title: "IoT with ESP32 and MQTT: controlling hardware from the browser",
    excerpt: "A practical walkthrough of connecting ESP32 microcontrollers to a Node.js backend over MQTT, with live updates streamed to a React frontend.",
    date: "Nov 2024",
    tag: "IoT",
    readTime: "10 min read",
    link: "https://harishpuhaniya.blogspot.com/",
  },
  {
    id: 4,
    title: "Designing for dark mode: lessons from building this portfolio",
    excerpt: "Color theory, contrast, typography choices, and the CSS variables system I built to make dark editorial design feel premium instead of gloomy.",
    date: "Jul 2026",
    tag: "Design",
    readTime: "5 min read",
    link: "https://harishpuhaniya.blogspot.com/",
  },
];

const TAG_COLORS = {
  Dev: "#c7522a",
  AI: "#7b61ff",
  IoT: "#22c55e",
  Design: "#f59e0b",
};

function BlogCard({ post, index }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = document.getElementById(`blog-card-${post.id}`);
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      id={`blog-card-${post.id}`}
      href={post.link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        padding: "28px",
        borderBottom: "1px solid var(--border)",
        textDecoration: "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
        background: "var(--bg)",
        transition2: "background 0.3s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--surface)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--bg)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.14em",
            color: TAG_COLORS[post.tag] || "var(--accent)",
            border: `1px solid ${TAG_COLORS[post.tag] || "var(--accent)"}33`,
            padding: "3px 8px", textTransform: "uppercase",
          }}>{post.tag}</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.12em", color: "var(--text-dim)" }}>
            {post.date}
          </span>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em", color: "var(--text-dim)" }}>
          {post.readTime}
        </span>
      </div>
      <h3 style={{
        fontFamily: "var(--serif)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
        fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 12,
      }}>
        {post.title}
      </h3>
      <p style={{ fontFamily: "var(--sans)", fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-muted)", marginBottom: 16 }}>
        {post.excerpt}
      </p>
      <span style={{
        fontFamily: "var(--mono)", fontSize: "0.55rem", letterSpacing: "0.14em",
        textTransform: "uppercase", color: "var(--accent)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        Read on Blogger →
      </span>
    </a>
  );
}

const Contact = () => (
  <div className="pf-root">
    <MiniNav />
    <div className="pf-ticker">
      <div className="pf-ticker-track">
        {["Writing", "Dev", "AI", "IoT", "Design", "MERN", "Thoughts", "Tutorials", "Essays", "Tech",
          "Writing", "Dev", "AI", "IoT", "Design", "MERN", "Thoughts", "Tutorials", "Essays", "Tech"].map((t, i) => (
          <span key={i} className="pf-ticker-item">{t}</span>
        ))}
      </div>
    </div>

    <main className="pf-main">
      {/* Header */}
      <section style={{ padding: "40px 32px 0", borderBottom: "1px solid var(--border)" }}>
        {/* Hero image */}
        <div style={{ position: "relative", height: "clamp(180px, 28vh, 320px)", overflow: "hidden", marginBottom: 40 }}>
          <img
            src={jogu}
            alt="Blog"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(80%) brightness(0.4)" }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px" }}>
            <span className="pf-section-label" style={{ display: "block", marginBottom: 12 }}>№ 004 — Written Work</span>
            <h1 style={{
              fontFamily: "var(--serif)", fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 600, lineHeight: 0.9, display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap"
            }}>
              <span style={{ color: "var(--text-primary)" }}>The</span>
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>blog</span>
            </h1>
          </div>
        </div>

        {/* Meta bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: 24, marginBottom: 0, borderBottom: "1px solid var(--border)"
        }}>
          <span className="pf-section-label">{POSTS.length} Posts · harishpuhaniya.blogspot.com</span>
          <a
            href="https://harishpuhaniya.blogspot.com/"
            target="_blank"
            rel="noreferrer"
            className="pf-browse-btn"
            style={{ color: "var(--accent)", fontSize: "0.55rem" }}
          >
            Visit Full Blog →
          </a>
        </div>

        {/* Post list */}
        <div style={{ border: "1px solid var(--border)", borderTop: "none", marginBottom: 48 }}>
          {POSTS.map((p, i) => <BlogCard key={p.id} post={p} index={i} />)}
        </div>
      </section>

      <footer className="pf-footer">
        <span className="pf-footer-copy">© {new Date().getFullYear()} Harish Puhaniya</span>
        <Link to="/" className="pf-browse-btn" style={{ fontSize: "0.55rem" }}>← Back to Home</Link>
      </footer>
    </main>
  </div>
);

export default Contact;