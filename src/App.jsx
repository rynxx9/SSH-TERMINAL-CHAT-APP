import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import RightSidebar from './components/layout/RightSidebar';
import PostCard from './components/feed/PostCard';

const MOCK_POSTS = [
  {
    id: 1,
    title: "How to master React in 2026 for the Moroccan market?",
    excerpt: "Salam developers! I've been seeing a lot of questions about which stack to choose for local startups. React remains dominant because of the large pool of talent and mature ecosystem...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    author: "yassine_dev",
    tag: "ma/react_js",
    time: "2h ago",
    votes: 342,
    comments: 42
  },
  {
    id: 2,
    title: "Best resources to learn Flutter in Darija?",
    excerpt: "I'm looking for YouTube channels or courses that explain mobile development in our local language. Any recommendations?",
    author: "noura_codes",
    tag: "ma/flutter",
    time: "5h ago",
    votes: 156,
    comments: 28
  },
  {
    id: 3,
    title: "A glimpse into Morocco's growing AI ecosystem",
    excerpt: "From UM6P initiatives to private startups in Casablanca, AI is taking off. Here's what you need to know about current opportunities and research centers...",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    author: "omar_tech",
    tag: "ma/ai_morocco",
    time: "10h ago",
    votes: 890,
    comments: 112
  },
  {
    id: 4,
    title: "Is anyone going to DevFest Casablanca this year?",
    excerpt: "Just got my ticket for DevFest! Looking forward to the sessions on Web3 and Cloud Native. Who else is joining? Let's meet up!",
    author: "saad_cloud",
    tag: "ma/events",
    time: "12h ago",
    votes: 420,
    comments: 65
  },
  {
    id: 5,
    title: "How I landed my first remote job from Morocco paying in USD 🚀",
    excerpt: "Story time! It took me 6 months of applying, countless rejections, and refining my portfolio. Here is the exact strategy I used and the platforms that worked for me...",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop",
    author: "laila_remote",
    tag: "ma/career",
    time: "1d ago",
    votes: 1250,
    comments: 310
  },
  {
    id: 6,
    title: "Next.js vs Remix - What's the best choice for e-commerce?",
    excerpt: "I'm building a new online store for a local client. I've used Next.js extensively but I keep hearing good things about Remix's data loading. Thoughts?",
    author: "ilyas_frontend",
    tag: "ma/webdev",
    time: "1d ago",
    votes: 215,
    comments: 54
  },
  {
    id: 7,
    title: "Starting a new OSS project: Darija NLP toolkit",
    excerpt: "Salam everyone! I'm starting an open-source project to build NLP tools specifically tailored for Moroccan Darija. Looking for contributors who are passionate about Python and Machine Learning.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop",
    author: "asmaa_data",
    tag: "ma/opensource",
    time: "2d ago",
    votes: 680,
    comments: 89
  },
  {
    id: 8,
    title: "Best co-working spaces in Rabat for software engineers?",
    excerpt: "Working from home is getting a bit lonely. Can anyone recommend some good co-working spaces in Rabat with reliable fiber optics and good coffee?",
    author: "mehdi_backend",
    tag: "ma/networking",
    time: "3d ago",
    votes: 95,
    comments: 21
  }
];

function App() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Sidebar />

        <section className="col-span-1 lg:col-span-7 space-y-6">
          {/* Create Post Mock */}
          <div className="bg-white/60 dark:bg-primary/5 backdrop-blur-md border border-white/40 dark:border-primary/20 shadow-sm rounded-xl p-4 flex gap-4 items-center">
            <div className="h-10 w-10 rounded-full bg-primary/20 shrink-0 overflow-hidden">
              <img alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR0r7w9UdEpAkpJVKqyQtMpzy8-rUzsSXJxFs1nc27IfrOh1AvZOogvTBq9MUfbbe40CZxqaj5r4hvBG2qjwDMyUpA3uHog7IANMQ2JRRaT2WZLgdfHeTdqd7CujB0H-cgZFyuNzr9jlqKf2BmgkqJTC9fJ65x0gY9f_bP01yjtYSkh7j3z1ZAu2dJWMQE81B60_v1dr8p8GwZCy2TS3IFJ_vYy-3V9ZEDjOBCDRNVoWqR70ZMNQ2NmTASjxBKtqivUV0-__mV6ls2" />
            </div>
            <input className="flex-1 bg-slate-100 dark:bg-primary/10 border-transparent rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="Create a post" type="text" />
            <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/10 text-slate-500">
              <span className="material-symbols-outlined">image</span>
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-primary/10 text-slate-500">
              <span className="material-symbols-outlined">link</span>
            </button>
          </div>

          {MOCK_POSTS.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>

        <RightSidebar />
      </main>
    </>
  );
}

export default App;
