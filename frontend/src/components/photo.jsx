import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import pogu from "../assets/pgaph.webp";
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

/* ── Sample photo gallery data ───────────────────────────── */
const GALLERY = [
  { id: 1, src: pogu, caption: "Campus life, Kurukshetra 2024", tags: ["Architecture", "Campus"] },
  { id: 2, src: pogu, caption: "Golden hour, Panipat 2023", tags: ["Landscape", "Light"] },
  { id: 3, src: pogu, caption: "Street textures, Delhi 2024", tags: ["Street", "Urban"] },
  { id: 4, src: pogu, caption: "Lab sessions, NIT 2025", tags: ["Documentary"] },
  { id: 5, src: pogu, caption: "Monsoon morning, Haryana 2024", tags: ["Nature", "Weather"] },
  { id: 6, src: pogu, caption: "Portrait, Kurukshetra 2025", tags: ["Portrait"] },
];

function PhotoCard({ photo, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
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
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
        <img
          src={photo.src}
          alt={photo.caption}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "grayscale(70%)",
            transition: "transform 0.6s ease, filter 0.4s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.filter = "grayscale(0%)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.filter = "grayscale(70%)";
          }}
        />
        <div style={{
          position: "absolute", top: 12, right: 12,
          fontFamily: "var(--mono)", fontSize: "0.52rem", letterSpacing: "0.14em",
          color: "var(--text-dim)", textTransform: "uppercase",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: 8 }}>
          {photo.caption}
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {photo.tags.map(t => (
            <span key={t} style={{
              fontFamily: "var(--mono)", fontSize: "0.48rem", letterSpacing: "0.1em",
              color: "var(--accent)", border: "1px solid rgba(199,82,42,0.3)",
              padding: "2px 7px", textTransform: "uppercase",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const Photo = () => {
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setSelectedFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!selectedFile) { alert("Please select a file first!"); return; }
    const formData = new FormData();
    formData.append("image", selectedFile);
    setUploading(true);
    try {
      const res = await axios.post("/api/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      alert(res.data.message);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pf-root">
      <MiniNav />
      <div className="pf-ticker">
        <div className="pf-ticker-track">
          {["Photography", "Landscape", "Portrait", "Street", "Architecture", "Documentary", "Kurukshetra", "2025",
            "Photography", "Landscape", "Portrait", "Street", "Architecture", "Documentary", "Kurukshetra", "2025"].map((t, i) => (
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
                № 003 — Visual Archive
              </span>
              <h1 style={{
                fontFamily: "var(--serif)", fontSize: "clamp(3.5rem, 9vw, 8rem)",
                fontWeight: 600, lineHeight: 0.9, display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap"
              }}>
                <span style={{ color: "var(--text-primary)" }}>Photo</span>
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>graphy</span>
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="pf-archive-count">{GALLERY.length} Frames</span>
              <span className="pf-archive-years" style={{ display: "block" }}>2023 — 2025</span>
            </div>
          </div>

          {/* Gallery grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            marginBottom: 48,
          }}>
            {GALLERY.map((p, i) => <PhotoCard key={p.id} photo={p} index={i} />)}
          </div>
        </section>

        {/* Upload panel */}
        <section style={{ padding: "48px 32px", borderBottom: "1px solid var(--border)" }}>
          <span className="pf-section-label" style={{ display: "block", marginBottom: 24 }}>§ Upload Frame</span>
          <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: "var(--sans)", fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.7 }}>
              This photo gallery will be fully updated soon. Upload a frame below.
            </p>
            <label style={{
              border: "1px dashed var(--border)", padding: "32px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
              cursor: "pointer", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = ""}
            >
              <span style={{ fontFamily: "var(--mono)", fontSize: "0.58rem", letterSpacing: "0.16em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                {selectedFile ? selectedFile.name : "Select image →"}
              </span>
              <input type="file" accept="image/*" onChange={handleChange} ref={fileRef} style={{ display: "none" }} />
            </label>
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="pf-form-btn"
            >
              {uploading ? "Uploading..." : "Upload Frame →"}
            </button>
          </div>
        </section>

        <footer className="pf-footer">
          <span className="pf-footer-copy">© {new Date().getFullYear()} Harish Puhaniya</span>
          <Link to="/" className="pf-browse-btn" style={{ fontSize: "0.55rem" }}>← Back to Home</Link>
        </footer>
      </main>
    </div>
  );
};

export default Photo;