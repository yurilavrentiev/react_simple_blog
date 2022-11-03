import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BlogContent from './components/HomePage/BlogContent/BlogContent';
import { posts } from './State/State'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BlogContent posts={posts} />
      </main>
      <Footer year={new Date().getFullYear()}/>
    </div>
  );
}

export default App;
