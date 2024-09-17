import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>LLM Showcase</h1>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#top-rated">Top Rated LLMs</a></li>
        <li><a href="#latest-reviews">Latest Reviews</a></li>
        <li><a href="#llm-of-the-day">LLM of the Day</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;