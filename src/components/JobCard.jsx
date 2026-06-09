import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card-large">
      <div className="job-card-header">
        <div className="job-card-title-group">
          <h3>{job.title}</h3>
          <p className="company-name">{job.company}</p>
        </div>
        <button className="btn btn-outline btn-save">
          <span className="star-icon">☆</span> Save
        </button>
      </div>
      <div className="job-card-details">
        <span className="detail-item">{job.location}</span>
        <span className="detail-separator">•</span>
        <span className="detail-item">{job.salary}</span>
        <span className="detail-separator">•</span>
        <span className="detail-item job-type">{job.type}</span>
        <span className="detail-separator">•</span>
        <span className="detail-item time-posted">{job.postedAt}</span>
      </div>
    </div>
  );
};

export default JobCard;
