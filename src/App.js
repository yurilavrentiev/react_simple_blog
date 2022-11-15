import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BlogContent from './components/HomePage/BlogContent/BlogContent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import ContactsPage from './components/ContactsPage/ContactsPage';




function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
          <Route path='/' element={<BlogContent />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/contacts' element={<ContactsPage />} />
          
          </Routes>
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}

export default App;
