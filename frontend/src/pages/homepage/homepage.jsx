import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./homepage.css"; // Import custom CSS for this component
import "../../components/Features/Features";
import Feature20 from "../../components/Features/Features";
import Feature55 from "../../components/choose/Choose";
import Footer from "../../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/practice");
  };
  return (
    <>
      <Navbar />
      <div className="homepage">
        {/* Hero Section */}
        <div className="backgroundhome">
          <img src="/profile_back.jpg" alt="bg-image" className="bg-image" />

          <div className="hero-content">
            <img src="/eduhub.png" alt="bg-image" className="logo-image" />
            <h1>Build Your Confidence</h1>
            <p>
              Let us help you achieve a great score in your Duolingo English
              Test. Start your free practice today.
            </p>
            <button className="hero-cta" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="hero-background"></div>
        </div>

        {/* Introduction Section */}
        <div className="introduction-section">
          {/* <div className="introduction-content">
            <h2>Why Choose Eduhub?</h2>
            <p>
              Eduhub offers the most effective and engaging practice platform
              for Duolingo English Test takers. Whether you're a beginner or
              looking to improve your score, our personalized learning paths,
              realistic practice tests, and instant feedback will guide you to
              success.
            </p>
          </div>
          <div className="introduction-image">
            <img src="eduhub.png" alt="Introduction" />
          </div> */}
          <Feature55 />
        </div>
        {/* Features Section */}
        <div className="features-section">
          <Feature20 />
          {/* <h2>Our Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <img src="eduhub.png" alt="Personalized Learning Paths" />
              <h3>Personalized Learning Paths</h3>
              <p>Tailored study plans that adapt to your learning needs.</p>
            </div>
            <div className="feature-item">
              <img src="eduhub.png" alt="Realistic Practice Tests" />
              <h3>Realistic Practice Tests</h3>
              <p>
                Practice tests that closely resemble the actual Duolingo English
                Test.
              </p>
            </div>
            <div className="feature-item">
              <img src="eduhub.png" alt="Instant Feedback" />
              <h3>Instant Feedback</h3>
              <p>
                Get immediate insights into your performance to improve quickly.
              </p>
            </div>
          </div> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
