import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BlogContent from './components/HomePage/BlogContent/BlogContent';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import ContactsPage from './components/ContactsPage/ContactsPage';




function App() {

  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('isLoggedIn') === 'true') ? true : false);
  const [userName, setUserName] = useState(localStorage.getItem('userName'));


  return (
    <Router>
      <div className="App">
        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userName={userName}/>
        <main>
          {
            isLoggedIn ?
            <Routes>
          <Route path='/' element={<BlogContent />} />
          <Route path='/contacts' element={<ContactsPage />} />
          </Routes> :
          <LoginPage  setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
          }
          
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}

export default App;
