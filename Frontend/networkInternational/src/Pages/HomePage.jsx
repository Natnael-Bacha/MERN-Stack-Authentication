import React from "react";
import "./HomePage.css";
import axios from "axios";
import { useNavigate } from "react-router";

const HomePage = (user) => {
  const navigate = useNavigate();
  function Logout() {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/userAuth/logoutg`,
      "_self"
    );
  }
  const handleLogout = async () => {
    try {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/userAuth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("userData");

      navigate("/userSignin");
    } catch (error) {
      console.error("Logout failed:", error);

      alert("Logout failed. Please try again.");
    }
  };

  const projects = [
    {
      name: "LegalEase-Platform",
      url: "https://symphonious-arithmetic-afcd3b.netlify.app/",
      description:
        "A service that helps clients find and hire the right lawyer based on their budget and needs, and gives lawyers the tools to manage their profiles and caseloads.",
    },
    {
      name: "Hotel Management System",
      url: "https://creative-cactus-3e49ca.netlify.app/",
      description:
        "Comprehensive Hotel Room Management with Real-time State Control, Advanced Search/Filter Capabilities, and Secure Authentication",
    },
  ];

  const features = [
    {
      title: "Secure JWT Authentication",
      description: "Industry-standard JWT tokens for secure user sessions",
    },
    {
      title: "Rate Limiting Protection",
      description:
        "Advanced rate limiting to prevent abuse and ensure system stability",
    },
    {
      title: "Password Reset System",
      description:
        "Secure password recovery with email verification and temporary tokens",
    },
    {
      title: "Email Verification",
      description:
        "Comprehensive email verification system for account security",
    },
    {
      title: "Session Management",
      description: "Robust session handling with secure logout across devices",
    },
  ];

  const techStack = [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT",
    "Redis",
    "CSS3",
    "JavaScript",
    "REST APIs",
    "Git",
    "Netlify",
    "Authentication",
    "Security",
    "Web Development",
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Email copied to clipboard!");
    });
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>Authentication Demo</h1>
          <button
            onClick={handleLogout}
            className="logout-button"
            title="Sign out of your account"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Sign Out
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your Dashboard</h1>
          <p className="hero-subtitle">
            You've successfully authenticated! This demo showcases a secure
            authentication system built with modern web technologies and
            industry best practices.
          </p>
        </div>
      </section>

      <section className="portfolio-section">
        <h2 className="section-title">About the Developer</h2>
        <div className="portfolio-content">
          <div className="developer-info">
            <h3>Natnael Bacha</h3>
            <p>
              Full-Stack Developer specializing in modern web applications with
              robust authentication systems and security best practices.
            </p>

            <div className="contact-info">
              <div className="contact-item">
                <strong>Email:</strong>
                <a>www.nathnaelbb@gmail.com</a>
              </div>

              <div className="contact-item">
                <strong>LinkedIn:</strong>
                <a
                  href="http://www.linkedin.com/in/natnael-bacha-1908602a1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Natnael Bacha
                </a>
              </div>

              <div className="contact-item">
                <strong>GitHub:</strong>
                <a
                  href="https://github.com/Natnael-Bacha"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Natnael-Bacha
                </a>
              </div>

              <div className="contact-item">
                <strong>Phone:</strong>
                <span>+251 954 925 624</span>
              </div>
            </div>
          </div>

          <div className="projects-section">
            <h3>Featured Projects</h3>
            <div className="projects-list">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Live Demo →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Authentication Features</h2>
        <p className="section-subtitle">
          Comprehensive security features implemented to ensure your data
          protection and seamless user experience
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-stack">
        <h2 className="section-title">Technical Stack</h2>
        <p className="section-subtitle">
          Modern technologies and frameworks used to build secure and scalable
          applications
        </p>
        <div className="tech-tags">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Build Something Amazing?</h2>
          <p>
            Let's connect and discuss how we can work together on your next
            project. I specialize in creating secure, scalable, and
            user-friendly web applications.
          </p>

          <div
            className="contact-item email-display"
            onClick={() => copyToClipboard("nathnaelbb@gmail.com")}
          >
            <strong>Email:</strong>
            <span className="styled-email">www.nathnaelbb@gmail.com</span>
          </div>

          <div className="cta-buttons">
            <a
              href="https://github.com/Natnael-Bacha"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button secondary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              View GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
