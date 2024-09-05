import React from 'react';
import './Stats.css'; // We'll create this CSS file to style the section
import Vector from '../../Assets/icons/Group 1000002515.svg'
import profile from '../../Assets/icons/Group 1000002516.svg'
import hosted from '../../Assets/icons/Group 1000002518.svg'
const Stats = () => {
  return (
    <section className="section-2">
      <div className="stat-card">
        <div className="icon-container">
          <img src={Vector} alt="AI Icon" className="stat-icon" />
        </div>
        <div className="stat-text">
          <h2>100K+</h2>
          <p>AI model submissions</p>
        </div>
      </div>

      <div className="divider"></div> {/* Divider for styling */}

      <div className="stat-card">
        <div className="icon-container">
          <img src={profile} alt="Data Scientist Icon" className="stat-icon" />
        </div>
        <div className="stat-text">
          <h2>50K+</h2>
          <p>Data Scientists</p>
        </div>
      </div>

      <div className="divider"></div> {/* Divider for styling */}

      <div className="stat-card">
        <div className="icon-container">
          <img src={hosted} alt="AI Challenges Icon" className="stat-icon" />
        </div>
        <div className="stat-text">
          <h2>100+</h2>
          <p>AI Challenges hosted</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
