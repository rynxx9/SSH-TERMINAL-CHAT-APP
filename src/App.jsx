import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import PostCard from './components/feed/PostCard';

const MOCK_POSTS = [
  {
    id: 1,
    title: "How to master React in 2026 for the Moroccan market?",
    excerpt: "Salam developers! I've been seeing a lot of questions about which stack to choose for local startups. React remains dominant because of the large pool of talent and mature ecosystem...",
    author: "yassine_dev",
    tag: "#react_js",
    time: "2h ago",
    votes: 342,
    comments: 42
  },
  {
    id: 2,
    title: "Best resources to learn Flutter in Darija?",
    excerpt: "I'm looking for YouTube channels or courses that explain mobile development in our local language. Any recommendations?",
    author: "noura_codes",
    tag: "#flutter",
    time: "5h ago",
    votes: 156,
    comments: 28
  },
  {
    id: 3,
    title: "A glimpse into Morocco's growing AI ecosystem",
    excerpt: "From UM6P initiatives to private startups in Casablanca, AI is taking off. Here's what you need to know about current opportunities and research centers...",
    author: "omar_tech",
    tag: "#ai_morocco",
    time: "10h ago",
    votes: 890,
    comments: 112
  }
];

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-layout container">
        <aside>
          <Sidebar />
        </aside>

        <section className="feed">
          <div className="feed-filter card">
            <button className="active">Hot</button>
            <button>New</button>
            <button>Top</button>
          </div>

          {MOCK_POSTS.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
