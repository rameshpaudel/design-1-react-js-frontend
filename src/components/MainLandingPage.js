import React from 'react';
import './MainLandingPage.css'; // Ensure this path is correct

const MainLandingPage = () => {
  return (
    <div className="main-landing-container">
      <header className="header">
        <h1 className="header-title">Malware Pro</h1>
        <div className="header-links">
          <a href="/login">Sign In</a>
          <a href="/register">Sign Up</a>
        </div>
      </header>

      <div className="content">
        <h2 className="main-title">Malware Scout</h2>
        <p className="description">
          Explore and analyze malicious files with our advanced tools.
        </p>

        <div className="links-section">
          <h3>Dummy Links</h3>
          <ul>
            <li><a href="http://example.com/link1">Link to Analysis 1</a></li>
            <li><a href="http://example.com/link2">Link to Analysis 2</a></li>
            <li><a href="http://example.com/link3">Link to Analysis 3</a></li>
          </ul>
        </div>

        <div className="files-section">
          <h3>Dummy Files</h3>
          <ul>
            <li><a href="http://example.com/file1.zip">Malware Sample 1.zip</a></li>
            <li><a href="http://example.com/file2.zip">Malware Sample 2.zip</a></li>
            <li><a href="http://example.com/file3.zip">Malware Sample 3.zip</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainLandingPage;
