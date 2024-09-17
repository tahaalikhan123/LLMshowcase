import React from 'react';
import './LLMGrid.css';

const LLMGrid = () => {
  return (
    <section id="top-rated" className="llm-grid">
      <h2>Top Rated LLMs</h2>
      <div className="grid">
        <div className="grid-item">LLM 1</div>
        <div className="grid-item">LLM 2</div>
        <div className="grid-item">LLM 3</div>
      </div>
    </section>
  );
};

export default LLMGrid;