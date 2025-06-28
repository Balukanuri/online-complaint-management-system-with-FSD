import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaBell,
  FaComments,
  FaRocket,
  FaSync,
  FaEye
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import '../styles/main.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaSync size={32} />,
      title: "Live Status Updates",
      description: "Real-time tracking of your complaint's progress through every stage.",
      color: "#4e73df"
    },
    {
      icon: <FaChartLine size={32} />,
      title: "Process Analytics",
      description: "See resolution times, bottlenecks, and team performance metrics.",
      color: "#1cc88a"
    },
    {
      icon: <FaEye size={32} />,
      title: "Transparency Portal",
      description: "Full visibility into who's handling your case and what's happening.",
      color: "#e74a3b"
    },
    {
      icon: <FaClock size={32} />,
      title: "SLA Monitoring",
      description: "Automatic tracking of response times against service agreements.",
      color: "#f6c23e"
    },
    {
      icon: <FaCheckCircle size={32} />,
      title: "Resolution Forecast",
      description: "AI predicts when your issue will be resolved based on similar cases.",
      color: "#36b9cc"
    },
    {
      icon: <FaUsers size={32} />,
      title: "Collaborative Resolution",
      description: "Direct messaging with support teams and contributors.",
      color: "#858796"
    }
  ];

  return (
    <div className="landing-container">
      {/* Animated background elements */}
      <div className="floating-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>

      <div className="landing-overlay">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <FaRocket className="me-2" /> VERSION 2.0
          </motion.div>
          
          <h1 className="landing-title">
            Complaint Resolution <span>With Full Visibility</span>
          </h1>
          
          <p className="landing-subtitle">
            Know exactly where your complaint stands at every moment with our 
            real-time tracking and predictive resolution platform.
          </p>

          <div className="cta-buttons">
            <motion.button
              className="primary-btn"
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account <FiArrowRight className="ms-2" />
            </motion.button>
            
            <motion.button
              className="secondary-btn"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section - Now showing process metrics */}
        <motion.div 
          className="stats-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="stat-item">
            <h2>4.2h</h2>
            <p>Avg. First Response Time</p>
          </div>
          <div className="stat-item">
            <h2>87%</h2>
            <p>Resolved Within SLA</p>
          </div>
          <div className="stat-item">
            <h2>24/7</h2>
            <p>Status Updates</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;