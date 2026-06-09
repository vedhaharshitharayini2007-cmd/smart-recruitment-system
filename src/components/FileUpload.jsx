import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="file-upload-section">
      <div className="file-upload-header">
        <h2>Upload Your Resume</h2>
        <p>Drop your resume or portfolio files here to get better AI matches.</p>
      </div>
      
      <form 
        className={`file-upload-form ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          ref={inputRef}
          type="file" 
          id="file-upload" 
          multiple={true}
          onChange={handleChange} 
          accept=".pdf,.doc,.docx,.rtf,.txt"
          className="hidden-input"
        />
        
        <div className="upload-content">
          <div className="upload-icon">📄</div>
          <h3>Drag & Drop your files here</h3>
          <p>or</p>
          <button type="button" className="btn btn-outline" onClick={onButtonClick}>
            Browse Files
          </button>
        </div>
      </form>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files-list">
          <h3>Uploaded Files</h3>
          <div className="files-container">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="file-item">
                <div className="file-info">
                  <span className="file-icon">📁</span>
                  <div className="file-details">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{file.size}</span>
                  </div>
                </div>
                <button 
                  className="btn-remove-file" 
                  onClick={() => removeFile(idx)}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-block" style={{marginTop: '1rem'}}>
            Process Files with AI
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
