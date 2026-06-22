import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE = "service_bfrwj16";
const EMAILJS_TEMPLATE = "template_e4722ba";
const EMAILJS_KEY = "XCpQd1pWP72Jl-Cc6";

const data = {
  name: "Afsana Akter Mim",
  title: "Computer Science & Engineering",
  tagline: "Full-Stack Developer · AI Enthusiast · Problem Solver",
  email: "afsanameem200@gmail.com",
  phone: "01521789016",
  location: "Lalmatia Block A, Dhaka",
  linkedin: "https://linkedin.com/in/afsana-akter-mim-1a0398374",
  github: "https://github.com/Afsanameem0",
  about:
    "I have completed my B.Sc in Computer Science & Engineering from BRAC University. I build full-stack web applications with JavaScript, React, Node.js, and MongoDB, and have hands-on experience in machine learning and embedded systems. I love turning ideas into working products.",
  skills: {
    Languages: ["JavaScript", "Python", "SQL", "C++"],
    Frontend: ["React.js", "HTML", "CSS", "Tailwind CSS"],
    Backend: ["Node.js", "Express.js", "PHP", "Laravel"],
    Databases: ["MongoDB", "MySQL"],
    Tools: ["Git", "GitHub", "VS Code", "Postman", "Jupyter Notebook"],
    Concepts: [
      "REST APIs",
      "MVC Architecture",
      "Authentication",
      "CRUD",
      "Machine Learning",
    ],
  },
  projects: [
    {
      title: "Thesis Portal",
      subtitle: "Team-Based Academic Management System",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      period: "Jun – Sep 2025",
      points: [
        "Developed frontend components for student and teacher dashboards",
        "Built RESTful APIs with Node.js and Express.js",
        "Implemented role-based authentication and CRUD functionality",
        "Collaborated using Git; manual testing to identify and fix bugs",
      ],
      icon: "🎓",
    },
    {
      title: "To-Do List App",
      subtitle: "Full-Stack MERN Application",
      stack: ["MongoDB", "Express.js", "React", "Node.js"],
      period: "Jun – Oct 2024",
      points: [
        "Designed and developed a full-stack task management application",
        "Implemented CRUD operations following MVC architecture",
        "Built RESTful APIs and integrated them with the frontend",
        "Collaborated in a team environment using Git",
      ],
      icon: "✅",
    },
    {
      title: "ECG Arrhythmia Analysis",
      subtitle: "Explainable AI — Data Science Project",
      stack: ["Python", "TensorFlow", "Grad-CAM", "MIT-BIH Dataset"],
      period: "Dec 2024 – Jan 2025",
      points: [
        "Built CNN model to classify arrhythmias from ECG spectrogram images",
        "Integrated Grad-CAM for interpretability with prediction heatmaps",
        "Conducted preprocessing, feature extraction, and model evaluation",
      ],
      icon: "🫀",
    },
    {
      title: "Tree Sterility Prediction",
      subtitle: "AI Course Project — Machine Learning",
      stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      period: "Jan – Jun 2024",
      points: [
        "Developed ML models to predict tree sterility from agricultural data",
        "Performed EDA, feature engineering, and preprocessing",
        "Compared Logistic Regression, Decision Trees, Random Forest",
        "Evaluated with accuracy, precision, recall, F1-score metrics",
      ],
      icon: "🌳",
    },
    {
      title: "Smart Hospital Sanitation Robot",
      subtitle: "Hardware Project",
      stack: ["Arduino", "C++", "Ultrasonic Sensors", "Servo Motors"],
      period: "Jun – Sep 2025",
      points: [
        "Built Arduino-powered 4WD robot with ultrasonic obstacle avoidance",
        "Servo-based sweeping brush and motion-triggered sanitizer spray",
        "Developed embedded C++ for autonomous navigation and sensor control",
      ],
      icon: "🤖",
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      school: "BRAC University",
      grade: "CGPA: 3.01",
      year: " June 2026",
    },
    {
      degree: "HSC in Science",
      school: "Dhaka City College",
      grade: "GPA: 5.00",
      year: "2020",
    },
    {
      degree: "SSC in Science",
      school: "Dhanmondi Govt. Girls' High School",
      grade: "GPA: 5.00",
      year: "2018",
    },
  ],
  certifications: [
    {
      name: "Next-Gen Developer Training (Full-Stack, 3-Month Intensive)",
      org: "Business Automation Ltd.",
      period: "Jul – Oct 2025",
    },
    {
      name: "Web Development Training",
      org: "BRAC University (TARC Residential Semester)",
      period: "Jan – Apr 2023",
    },
    {
      name: "UX Design Decision-Making with AI",
      org: "Grameenphone Ltd.",
      period: "March 2026",
    },
    {
      name: "Design System Thinking with AI",
      org: "Grameenphone Ltd.",
      period: "March 2026",
    },
    {
      name: "Professional Skills Development Program (PSDP)",
      org: "OCSAR, BRAC University",
      period: "Spring 2026",
    },
  ],
};

const NAV = ["About", "Skills", "Projects", "Education", "Contact"];

const ROLES = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
  "MERN Stack Developer",
];

export default function App() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setError(false);
    emailjs
      .send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_KEY,
      )
      .then(() => {
        setSent(true);
        setSending(false);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      })
      .catch(() => {
        setSending(false);
        setError(true);
        setTimeout(() => setError(false), 4000);
      });
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          70,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 1600);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060c1a] text-slate-100 font-sans">
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1,h2,h3,.font-display { font-family: 'Syne', sans-serif; }
        .gradient-text {
          background: linear-gradient(135deg, #38bdf8, #818cf8, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(56,189,248,0.12);
        }
        .card-jump {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-jump:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(56,189,248,0.15);
          border-color: rgba(56,189,248,0.3);
        }
        .input-field {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 16px;
          color: #e2e8f0;
          width: 100%;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .input-field:focus {
          border-color: rgba(56,189,248,0.6);
          box-shadow: 0 0 0 3px rgba(56,189,248,0.08);
        }
        .input-field::placeholder { color: rgba(148,163,184,0.5); }
        .skill-pill {
          transition: all 0.2s ease;
        }
        .skill-pill:hover {
          background: rgba(56,189,248,0.2);
          color: #38bdf8;
        }
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.7s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .dot-grid {
          background-image: radial-gradient(circle, rgba(56,189,248,0.10) 1px, transparent 1px);
          background-size: 28px 28px;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060c1a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-display font-bold text-lg gradient-text">
            AAM
          </span>
          {/* Desktop */}
          <div className="hidden md:flex gap-1">
            {NAV.map((n) => (
              <button
                key={n}
                onClick={() => scrollTo(n)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active === n
                    ? "bg-sky-500/20 text-sky-300"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          {/* Mobile burger */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#060c1a] border-t border-white/5 px-6 py-4 flex flex-col gap-2">
            {NAV.map((n) => (
              <button
                key={n}
                onClick={() => scrollTo(n)}
                className="text-left text-slate-300 hover:text-white py-1.5"
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section
        id="About"
        className="min-h-screen dot-grid flex items-center pt-16"
      >
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-sky-400 font-medium tracking-widest text-sm uppercase mb-4">
              Hi, I'm
            </p>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-tight mb-3">
              Afsana Akter
              <br />
              <span className="gradient-text">Mim</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 font-light flex items-center gap-1">
              <span className="text-sky-300 font-semibold">{displayed}</span>
              <span className="inline-block w-0.5 h-6 bg-sky-400 ml-0.5 animate-pulse" />
            </p>
            <p className="text-slate-400 max-w-xl leading-relaxed mb-10">
              {data.about}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={data.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-all"
              >
                View GitHub →
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 hover:border-sky-400/60 text-slate-300 hover:text-white font-semibold text-sm transition-all"
              >
                LinkedIn Profile
              </a>
              <a
                href={`mailto:${data.email}`}
                className="px-6 py-3 rounded-full border border-white/20 hover:border-sky-400/60 text-slate-300 hover:text-white font-semibold text-sm transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="Skills" className="py-24 bg-[#04091a]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="Expertise" title="Technical Skills" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {Object.entries(data.skills).map(([cat, items]) => (
              <div
                key={cat}
                className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6"
              >
                <h3 className="font-display font-bold text-sky-400 text-sm uppercase tracking-widest mb-4">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="skill-pill bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="Projects" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="What I've Built" title="Projects" />
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {data.projects.map((p, i) => (
              <div
                key={i}
                className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-4"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{p.subtitle}</p>
                    <p className="text-slate-600 text-xs mt-1">{p.period}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {p.points.map((pt, j) => (
                    <li key={j} className="text-slate-400 text-sm flex gap-2">
                      <span className="text-sky-500 mt-0.5 shrink-0">›</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="bg-sky-500/10 text-sky-300 text-xs px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section id="Education" className="py-24 bg-[#04091a]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="Academic Background" title="Education" />
          <div className="mt-12 space-y-4">
            {data.education.map((e, i) => (
              <div
                key={i}
                className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="font-display font-bold text-white">
                    {e.degree}
                  </h3>
                  <p className="text-slate-400 text-sm">{e.school}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="block text-sky-400 font-semibold text-sm">
                    {e.grade}
                  </span>
                  <span className="text-slate-500 text-xs">{e.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Certs */}
          <h3 className="font-display font-bold text-white text-2xl mt-16 mb-6">
            Certifications & Training
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.certifications.map((c, i) => (
              <div
                key={i}
                className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex gap-4 items-start"
              >
                <span className="text-sky-400 mt-0.5 shrink-0">🏅</span>
                <div>
                  <p className="text-white font-medium text-sm">{c.name}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {c.org} · {c.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="Contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader label="Get In Touch" title="Contact Me" />
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Left — Contact Form */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col gap-5">
              <div>
                <label className="block text-slate-400 text-sm mb-2">
                  Name
                </label>
                <input
                  className="input-field"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-2">
                  Email
                </label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-slate-400 text-sm mb-2">
                  Message
                </label>
                <textarea
                  className="input-field resize-none"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">
                  ❌ Something went wrong. Please try again.
                </p>
              )}
              <button
                onClick={handleSend}
                disabled={sending}
                className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 disabled:opacity-60 text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                {sending ? (
                  "Sending..."
                ) : sent ? (
                  "✅ Message Sent!"
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Right — Contact Info */}
            <div className="flex flex-col gap-5">
              {/* Info cards */}
              <div className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-0.5">
                    Email
                  </p>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-white font-medium hover:text-sky-400 transition-colors text-sm"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-0.5">
                    Phone
                  </p>
                  <p className="text-white font-medium text-sm">{data.phone}</p>
                </div>
              </div>

              <div className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-0.5">
                    Location
                  </p>
                  <p className="text-white font-medium text-sm">
                    {data.location}
                  </p>
                </div>
              </div>

              {/* Available badge */}
              <div className="card-jump bg-white/[0.03] border border-white/8 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 font-semibold text-sm">
                    Currently Available
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  I'm actively open to new opportunities and exciting projects.
                  Whether you need a full-time engineer or a collaborator, let's
                  talk!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <p>
          Designed & Built by{" "}
          <span className="text-slate-400">Afsana Akter Mim</span> ·{" "}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

function SectionHeader({ label, title, centered = false }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-sky-400 text-xs font-semibold uppercase tracking-widest mb-2">
        {label}
      </p>
      <h2 className="font-display font-extrabold text-4xl text-white">
        {title}
      </h2>
    </div>
  );
}
