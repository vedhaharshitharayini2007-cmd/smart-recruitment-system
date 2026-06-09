import React, { useState, useRef, useEffect } from 'react';
import './ProfilePanel.css';

const ACHIEVEMENTS = [
  { icon: '🚀', name: 'First Apply', desc: 'Applied to your first job', unlocked: true },
  { icon: '📄', name: 'Resume Ready', desc: 'Uploaded your resume', unlocked: false },
  { icon: '🎯', name: 'Sharp Shooter', desc: 'Applied to 5 jobs', unlocked: false },
  { icon: '⭐', name: 'Job Saver', desc: 'Saved 3 jobs', unlocked: true },
  { icon: '🤖', name: 'AI Explorer', desc: 'Used AI Auto-Match', unlocked: true },
  { icon: '🏆', name: 'Top Applicant', desc: 'Applied to 25 jobs', unlocked: false },
];

const ProfilePanel = ({ isOpen, onClose, userEmail }) => {
  const [closing, setClosing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 320);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') handleClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  if (!isOpen && !closing) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(f => ({
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const userName = userEmail ? userEmail.split('@')[0] : 'User';
  const initials = userName.slice(0, 1).toUpperCase();

  return (
    <div className={`profile-overlay ${closing ? 'closing' : ''}`} onClick={handleClose}>
      <div className="profile-panel" onClick={e => e.stopPropagation()}>

        {/* Panel Header */}
        <div className="panel-header">
          <h2>My Profile</h2>
          <button className="btn-panel-close" onClick={handleClose}>✕</button>
        </div>

        {/* User Info */}
        <div className="panel-profile-info">
          <div className="panel-avatar-large">{initials}</div>
          <div className="panel-user-meta">
            <h3>{userName}</h3>
            <p>{userEmail || 'user@example.com'}</p>
            <span className="profile-badge">🟢 Active Job Seeker</span>
          </div>
        </div>

        {/* Stats */}
        <div className="panel-section">
          <h3>📊 Activity Stats</h3>
          <div className="stats-row">
            <div className="stat-box">
              <div className="stat-number">3</div>
              <div className="stat-label">Jobs Applied</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">5</div>
              <div className="stat-label">Jobs Saved</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">1</div>
              <div className="stat-label">AI Matches</div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="panel-section">
          <h3>🏅 Achievements</h3>
          <div className="achievements-grid">
            {ACHIEVEMENTS.map((ach, i) => (
              <div key={i} className={`achievement-card ${ach.unlocked ? '' : 'locked'}`}>
                <div className="achievement-icon">{ach.unlocked ? ach.icon : '🔒'}</div>
                <div className="achievement-name">{ach.name}</div>
                <div className="achievement-desc">{ach.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="panel-section">
          <h3>📁 My Documents</h3>
          <div
            className={`panel-upload-zone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
              onChange={(e) => processFiles(e.target.files)}
            />
            <div className="upload-icon">📄</div>
            <p>Drag & drop your resume or click to browse</p>
            <button className="btn btn-outline" onClick={e => { e.stopPropagation(); inputRef.current.click(); }}>
              Browse Files
            </button>
          </div>

          {files.length > 0 && (
            <div className="panel-files-list">
              {files.map((f, i) => (
                <div key={i} className="panel-file-item">
                  <div className="panel-file-info">
                    <span className="panel-file-icon">📁</span>
                    <div>
                      <div className="panel-file-name">{f.name}</div>
                      <div className="panel-file-size">{f.size}</div>
                    </div>
                  </div>
                  <button className="btn-remove-panel-file" onClick={() => removeFile(i)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfilePanel;
