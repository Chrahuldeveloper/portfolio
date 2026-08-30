"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type View = "home" | "experience" | "projects" | "skills" | "contact";

const nav: { id: View; label: string; command: string }[] = [
  { id: "home", label: "Overview", command: "whoami" },
  { id: "experience", label: "Experience", command: "work --log" },
  { id: "projects", label: "Projects", command: "ls ./projects" },
  { id: "skills", label: "Stack", command: "cat stack.json" },
  { id: "contact", label: "Contact", command: "ping rahul" },
];

const experience = [
  {
    company: "AI Research Centre — Woxsen University",
    role: "AI Developer Intern",
    period: "Nov 2025 — Jan 2026",
    location: "Hyderabad",
    detail: "Built AI systems for teacher-subject mapping, school analytics, and data-driven administrative workflows.",
    tags: ["AI pipelines", "Admin systems", "Analytics"],
  },
  {
    company: "Grey Scientific Labs",
    role: "Software Engineering Intern",
    period: "May 2025 — Jun 2025",
    location: "Bangalore",
    detail: "Developed medical diagnosis dashboards, structured reports, data visualizations, and operational admin modules.",
    tags: ["Healthcare", "Dashboards", "Performance"],
  },
  {
    company: "MentorHeal",
    role: "Full Stack Developer",
    period: "Nov 2023 — Dec 2023",
    location: "Hyderabad",
    detail: "Shipped a responsive community platform with interactive features connecting mentors and users.",
    tags: ["Full stack", "Community", "Web"],
  },
  {
    company: "Socifyme Applications Pvt Ltd",
    role: "Software Engineering Intern",
    period: "Feb 2023 — Sep 2023",
    location: "Hyderabad",
    detail: "Architected a production logistics platform and scalable admin system with real-time order lifecycle tracking.",
    tags: ["React", "Google Cloud", "Logistics"],
  },
];

const skills = {
  languages: ["Java", "JavaScript", "TypeScript", "Python"],
  web: ["React", "Next.js", "Redux", "Node", "Express", "FastAPI", "Django", "GraphQL"],
  data: ["MongoDB", "MySQL", "PostgreSQL", "Prisma", "Drizzle"],
  infra: ["Google Cloud", "AWS", "Azure", "Docker", "Linux"],
  other: ["React Native", "LangChain", "FFmpeg", "System Design", "DSA"],
};

function Prompt({ children = "_" }: { children?: React.ReactNode }) {
  return (
    <span className="prompt" aria-hidden="true">
      <span className="prompt-user">rahul@portfolio</span>
      <span className="prompt-path">:~$</span> {children}
    </span>
  );
}

export default function TerminalPortfolio() {
  const [view, setView] = useState<View>("home");
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState("type ‘help’ to see commands");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runCommand = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    const routes: Record<string, View> = {
      whoami: "home",
      home: "home",
      about: "home",
      experience: "experience",
      work: "experience",
      "work --log": "experience",
      projects: "projects",
      ls: "projects",
      "ls ./projects": "projects",
      skills: "skills",
      stack: "skills",
      "cat stack.json": "skills",
      contact: "contact",
      "ping rahul": "contact",
    };

    if (routes[command]) {
      setView(routes[command]);
      setNotice(`executed: ${command}`);
    } else if (command === "help") {
      setNotice("commands: whoami · work · projects · skills · contact · clear");
    } else if (command === "clear") {
      setView("home");
      setNotice("session reset");
    } else if (command) {
      setNotice(`command not found: ${command} — try ‘help’`);
    }
    setInput("");
  };

  return (
    <main className="desktop-shell">
      <div className="ambient-grid" />
      <section className="terminal" aria-label="CH Rahul portfolio terminal">
        <header className="terminal-bar">
          <div className="traffic-lights" aria-hidden="true">
            <span className="close" />
            <span className="minimize" />
            <span className="maximize" />
          </div>
          <span className="terminal-title">rahul@portfolio: ~</span>
          <span className="secure-label">● SECURE</span>
        </header>

        <div className="terminal-body">
          <aside className="sidebar">
            <div>
              <p className="eyebrow">~/navigation</p>
              <nav aria-label="Portfolio sections">
                {nav.map((item, index) => (
                  <button
                    key={item.id}
                    className={view === item.id ? "nav-item active" : "nav-item"}
                    onClick={() => {
                      setView(item.id);
                      setNotice(`executed: ${item.command}`);
                    }}
                  >
                    <span>0{index + 1}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="sidebar-footer">
              <p><span className="status-dot" /> available for work</p>
              <p>Hyderabad, IN</p>
              <p>UTC +05:30</p>
            </div>
          </aside>

          <div className="workspace">
            <div className="workspace-topline">
              <span>session: guest</span>
              <span>shell: zsh</span>
              <span className="hide-mobile">pid: 8317</span>
            </div>

            <div className="output" aria-live="polite">
              {view === "home" && <HomeView setView={setView} />}
              {view === "experience" && <ExperienceView />}
              {view === "projects" && <ProjectsView />}
              {view === "skills" && <SkillsView />}
              {view === "contact" && <ContactView />}
            </div>

            <form className="command-line" onSubmit={runCommand}>
              <label htmlFor="terminal-command" className="sr-only">Enter a portfolio command</label>
              <Prompt />
              <input
                ref={inputRef}
                id="terminal-command"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="type a command..."
                autoComplete="off"
                spellCheck="false"
              />
              <span className="shortcut">[/] focus</span>
            </form>
            <div className="status-bar">
              <span>{notice}</span>
              <span>UTF-8&nbsp;&nbsp; LF&nbsp;&nbsp; TSX</span>
            </div>
          </div>
        </div>
      </section>
      <p className="outside-note">CH.RAHUL / SOFTWARE ENGINEER / 2026</p>
    </main>
  );
}

function HomeView({ setView }: { setView: (view: View) => void }) {
  return (
    <div className="home-view view-enter">
      <p className="command-echo"><Prompt>whoami</Prompt></p>
      <div className="hero-grid">
        <div>
          <p className="kicker">Hello, I’m</p>
          <h1>CH<br /><span>RAHUL</span></h1>
        </div>
        <div className="hero-copy">
          <div className="role-block">
            <span className="line-number">01</span>
            <p>Full-stack engineer building useful systems at the intersection of <strong>web, cloud, and AI.</strong></p>
          </div>
          <p className="muted">Computer Science graduate. Product builder. Two-time hackathon winner. Currently turning complex workflows into fast, human software.</p>
          <div className="hero-actions">
            <button onClick={() => setView("projects")}>./view-projects <span>↗</span></button>
            <a href="/CH-Rahul-Resume.pdf" download>resume.pdf <span>↓</span></a>
          </div>
        </div>
      </div>
      <div className="metrics" aria-label="Career highlights">
        <div><strong>04</strong><span>industry roles</span></div>
        {/* <div><strong>85+</strong><span>live product users</span></div> */}
        <div><strong>02</strong><span>hackathon wins</span></div>
        <div><strong>2026</strong><span>EEE graduate</span></div>
      </div>
      <p className="scroll-note"><span>↓</span> Select a file from the left, or run a command below.</p>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="view-enter section-view">
      <p className="command-echo"><Prompt>work --log</Prompt></p>
      <div className="section-heading">
        <div><span>01 / EXPERIENCE</span><h2>Shipped in the real world.</h2></div>
        <p>Four roles across logistics, community, healthcare, and education.</p>
      </div>
      <div className="timeline">
        {experience.map((job, index) => (
          <article className="job" key={job.company}>
            <div className="job-index">0{experience.length - index}</div>
            <div className="job-main">
              <div className="job-title"><h3>{job.company}</h3><span>{job.period}</span></div>
              <p className="role">{job.role} · {job.location}</p>
              <p>{job.detail}</p>
              <div className="tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="view-enter section-view">
      <p className="command-echo"><Prompt>ls ./projects</Prompt></p>
      <div className="section-heading">
        <div><span>02 / SELECTED WORK</span><h2>Products, not mockups.</h2></div>
        <p>Live software with real users, infrastructure, and constraints.</p>
      </div>
      <div className="project-grid">
        <a className="project-card featured" href="https://feedsenseai.vercel.app/" target="_blank" rel="noreferrer">
          <div className="project-top"><span>01</span><span>LIVE ↗</span></div>
          <div className="ascii-art" aria-hidden="true">{`┌─────────────┐\n│ FEEDBACK ▓▓ │\n│ SIGNAL   ▓▓ │\n└───────●─────┘`}</div>
          <div><p className="project-type">AI · SAAS · WEB APP</p><h3>FeedSenseAI</h3><p>Feedback intelligence that turns bug reports and feature requests into prioritized product insight.</p></div>
          <div className="project-meta"><span>LLaMA 3</span><span>Razorpay</span><span>20+ users</span></div>
        </a>
        <a className="project-card" href="https://matrixappcom.netlify.app/" target="_blank" rel="noreferrer">
          <div className="project-top"><span>02</span><span>LIVE ↗</span></div>
          <div className="ascii-art matrix-art" aria-hidden="true">{`●───●───●\n│ ╲ │ ╱ │\n●───●───●`}</div>
          <div><p className="project-type">PWA · REAL-TIME · SOCIAL</p><h3>Matrix</h3><p>A lightweight campus network for finding peers, sharing media, and collaborating in real time.</p></div>
          <div className="project-meta"><span>Real-time chat</span><span>PWA</span><span>65 users</span></div>
        </a>
      </div>
    </div>
  );
}

function SkillsView() {
  return (
    <div className="view-enter section-view">
      <p className="command-echo"><Prompt>cat stack.json</Prompt></p>
      <div className="section-heading">
        <div><span>03 / TOOLKIT</span><h2>Built for the whole stack.</h2></div>
        <p>From interface details to models, databases, and deployment.</p>
      </div>
      <div className="code-window">
        <div className="code-gutter">01<br />02<br />03<br />04<br />05<br />06<br />07</div>
        <div className="skill-lines">
          <span>&#123;</span>
          {Object.entries(skills).map(([key, values], index) => (
            <p key={key}><b>“{key}”</b>: [ {values.map((item, i) => <span key={item}>“{item}”{i < values.length - 1 ? ", " : ""}</span>)} ]{index < Object.keys(skills).length - 1 ? "," : ""}</p>
          ))}
          <span>&#125;</span>
        </div>
      </div>
      <div className="achievement-row">
        <span>🏆</span><p><strong>1st place × 2</strong><br />IoT Hackathon + App Development Hackathon</p>
        <span className="achievement-separator">+</span><p><strong>Top 10</strong><br />JNTU Hackathon</p>
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="view-enter section-view contact-view">
      <p className="command-echo"><Prompt>ping rahul</Prompt></p>
      <div className="contact-content">
        <p className="ping-result">64 bytes from rahul: icmp_seq=1 ttl=64 time=0.42 ms</p>
        <p className="kicker">Connection established.</p>
        <h2>Let’s build something<br /><span>worth shipping.</span></h2>
        <p className="muted">I’m interested in product engineering, full-stack systems, and applied AI opportunities.</p>
        <div className="contact-links">
          <a href="mailto:chrahulofficial@gmail.com"><span>EMAIL</span>chrahulofficial@gmail.com <b>↗</b></a>
          <a href="https://www.linkedin.com/in/chrahul/" target="_blank" rel="noreferrer"><span>LINKEDIN</span>/in/chrahul <b>↗</b></a>
          <a href="https://twitter.com/ChRahul_dev" target="_blank" rel="noreferrer"><span>X / TWITTER</span>@ChRahul_dev <b>↗</b></a>
          <a href="tel:+918317680338"><span>PHONE</span>+91 83176 80338 <b>↗</b></a>
        </div>
      </div>
    </div>
  );
}
