import React, { useState } from 'react';
import JobCard from './JobCard';
import './BrowseJobs.css';

const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    postedAt: '2 days ago',
    category: 'Technology'
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'InnovateLabs',
    location: 'New York, NY',
    salary: '$130,000 - $170,000',
    type: 'Full-time',
    postedAt: '5 days ago',
    category: 'Product'
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    location: 'Los Angeles, CA',
    salary: '$90,000 - $130,000',
    type: 'Full-time',
    postedAt: '1 day ago',
    category: 'Design'
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$100,000 - $150,000',
    type: 'Full-time',
    postedAt: '3 days ago',
    category: 'Technology'
  },
  {
    id: 5,
    title: 'Marketing Director',
    company: 'GlobalReach',
    location: 'Chicago, IL',
    salary: '$140,000 - $180,000',
    type: 'Full-time',
    postedAt: '1 week ago',
    category: 'Marketing'
  },
  {
    id: 6,
    title: 'Data Scientist',
    company: 'AI Solutions',
    location: 'San Francisco, CA',
    salary: '$150,000 - $190,000',
    type: 'Full-time',
    postedAt: '4 days ago',
    category: 'Technology'
  }
];

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('All');
  const [category, setCategory] = useState('All');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === 'All' || job.type === jobType;
    const matchesCategory = category === 'All' || job.category === category;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="browse-jobs-container">
      <div className="browse-header">
        <h1>Browse Jobs</h1>
        <p>Find your next opportunity</p>
      </div>

      <div className="filters-card">
        <div className="filter-group focus-group">
          <label>Search Jobs</label>
          <input 
            type="text" 
            placeholder="Search by job title, company, or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Job Type</label>
            <div className="filter-pills">
              <button 
                className={`pill-btn ${jobType === 'All' ? 'active' : ''}`}
                onClick={() => setJobType('All')}
              >
                All
              </button>
              <button 
                className={`pill-btn ${jobType === 'Full-time' ? 'active' : ''}`}
                onClick={() => setJobType('Full-time')}
              >
                Full-time
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <div className="filter-pills">
              {['All', 'Technology', 'Product', 'Design', 'Marketing'].map(cat => (
                <button
                  key={cat}
                  className={`pill-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-list">
        <p className="results-count">Showing {filteredJobs.length} of {mockJobs.length} jobs</p>
        
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="no-results">No jobs found matching your criteria.</div>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
