import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>© 2024 LLM Showcase</p>
      <div className="social-media">
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
      </div>
    </footer>
  );
};

export default Footer;