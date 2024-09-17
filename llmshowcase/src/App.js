import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import LLMOfTheDay from './components/LLMOfTheDay';
import LLMGrid from './components/LLMGrid';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <LLMOfTheDay />
      <LLMGrid />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;