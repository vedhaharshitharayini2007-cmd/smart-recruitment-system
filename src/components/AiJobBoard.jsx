import React, { useState, useEffect } from 'react';

const AiJobBoard = ({ onClose }) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulate AI loading process
    const timer = setTimeout(() => {
      setJobs([
        { id: 1, title: 'Senior Frontend Developer', company: 'TechNova', match: '98%' },
        { id: 2, title: 'UI/UX Engineer', company: 'Designify', match: '95%' },
        { id: 3, title: 'Full Stack Developer', company: 'WebFlow Inc', match: '92%' },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="ai-job-board">
      <div className="ai-header">
        <h2>✨ AI Recommended Jobs</h2>
        <button className="btn-close" onClick={onClose}>&times;</button>
      </div>

      {loading ? (
        <div className="ai-loader">
          <div className="spinner"></div>
          <p>Analyzing your profile...</p>
        </div>
      ) : (
        <div className="ai-results">
          {jobs.map((job) => (
            <div key={job.id} className="ai-job-card">
              <div className="job-info">
                <h4>{job.title}</h4>
                <p>{job.company}</p>
              </div>
              <div className="match-badge">{job.match} Match</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AiJobBoard;
