import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AiJobBoard from './components/AiJobBoard';
import LoginModal from './components/LoginModal';
import BrowseJobs from './components/BrowseJobs';
import ProfilePanel from './components/ProfilePanel';
import './App.css';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showAiBoard, setShowAiBoard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleAiMatchClick = () => setShowAiBoard(true);
  const handleCloseAiBoard = () => setShowAiBoard(false);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setIsProfileOpen(false);
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLoginClick={openLoginModal}
        onLogoutClick={handleLogout}
        onProfileClick={() => setIsProfileOpen(true)}
      />
      <main>
        {isLoggedIn ? (
          <BrowseJobs />
        ) : (
          <>
            <Hero
              onLoginClick={openLoginModal}
              onAiMatchClick={handleAiMatchClick}
            />
            <Features />
            {showAiBoard && (
              <AiJobBoard onClose={handleCloseAiBoard} />
            )}
          </>
        )}
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userEmail={userEmail}
      />
    </>
  );
}

export default App;
