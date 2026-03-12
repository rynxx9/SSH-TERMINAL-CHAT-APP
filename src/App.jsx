import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import RightSidebar from './components/layout/RightSidebar';
import PostCard from './components/feed/PostCard';
import LandingPage from './components/auth/LandingPage';
import PostView from './components/feed/PostView';
import CommunitiesView from './components/feed/CommunitiesView';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'trending', 'communities', 'community-detail', 'post-detail'
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await fetch('http://localhost:5000/api/posts');
        const postsData = await postsRes.json();
        setPosts(postsData);

        const communitiesRes = await fetch('http://localhost:5000/api/communities');
        const communitiesData = await communitiesRes.json();
        setCommunities(communitiesData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const getFilteredPosts = () => {
    let allPosts = [...posts];
    if (activeTab === 'trending') {
      return allPosts.sort((a, b) => b.votes - a.votes);
    }
    if (activeTab === 'community-detail' && selectedEntity) {
      return allPosts.filter(p => p.tag === selectedEntity.id);
    }
    return allPosts;
  };

  const displayedPosts = getFilteredPosts();

  return (
    <div className="relative min-h-screen">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/60 dark:bg-primary/50 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-500/50 dark:bg-blue-600/40 blur-[140px]"></div>
        <div className="absolute top-[20%] left-[40%] w-[50%] h-[50%] rounded-full bg-purple-500/50 dark:bg-purple-600/40 blur-[120px]"></div>
      </div>

      <Navbar />

      <main className="w-full px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <Sidebar
          className="lg:col-span-3"
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedEntity(null);
          }}
          onCommunityClick={(comm) => {
            setSelectedEntity(comm);
            setActiveTab('community-detail');
          }}
          communities={communities}
        />

        <section className="col-span-1 lg:col-span-6 space-y-6">
          {activeTab === 'feed' && (
            /* Create Post Mock */
            <div className="ios-glass ios-glass-border ios-glass-shadow rounded-xl p-4 flex gap-4 items-center">
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
          )}

          {activeTab === 'communities' && (
            <CommunitiesView
              communities={communities}
              onCommunityClick={(comm) => {
                setSelectedEntity(comm);
                setActiveTab('community-detail');
              }}
            />
          )}

          {activeTab === 'community-detail' && selectedEntity && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              {/* Community Header Card */}
              <div className="ios-glass ios-glass-border ios-glass-shadow rounded-[2.5rem] overflow-hidden">
                {/* Banner Gradient */}
                <div
                  className="h-32 md:h-44 w-full relative"
                  style={{ background: selectedEntity.banner || 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                >
                  <div className="absolute inset-0 bg-black/10 backdrop-brightness-90"></div>
                </div>

                {/* Profile Section (Merged with Banner Overlap) */}
                <div className="px-5 md:px-10 pb-10 relative">
                  <div className="flex flex-wrap items-center gap-4 md:gap-8 -mt-12 md:-mt-20 relative z-10">
                    {/* Overlapping Floating Icon */}
                    <div className={`w-24 h-24 md:w-36 md:h-36 rounded-full ${selectedEntity.color} shadow-2xl flex items-center justify-center text-4xl md:text-7xl font-black border-[3px] border-white/50 backdrop-blur-3xl animate-in zoom-in-50 duration-500 shrink-0`}>
                      {selectedEntity.id.split('/')[1][0]}
                    </div>

                    {/* Community Title & Tags */}
                    <div className="flex-1 min-w-[240px] pt-4 md:pt-12">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-5xl font-black tracking-tighter leading-none break-all md:break-normal">{selectedEntity.id}</h2>
                        <span className="material-symbols-rounded text-primary text-xl md:text-3xl drop-shadow-sm shrink-0">verified</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3 md:mt-5">
                        {selectedEntity.tags?.map(tag => (
                          <span key={tag} className="text-[7.5px] md:text-[9px] font-black uppercase tracking-[0.2em] px-2 md:px-3 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className="flex items-center gap-4 md:gap-8 pt-4 md:pt-12 ml-auto">
                      <div className="text-right">
                        <p className="text-xl md:text-3xl font-black text-primary leading-none tracking-tighter">{selectedEntity.members}</p>
                        <p className="text-[7.5px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1.5 opacity-60">Hivers</p>
                      </div>
                      <div className="w-[1px] h-8 md:h-12 bg-slate-200 dark:bg-white/10 shrink-0 opacity-50"></div>
                      <div className="text-right">
                        <p className="text-xl md:text-3xl font-black text-primary leading-none tracking-tighter">{selectedEntity.posts}</p>
                        <p className="text-[7.5px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1.5 opacity-60">Hives</p>
                      </div>
                    </div>
                  </div>

                  {/* Description & Action */}
                  <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center">
                    <div className="lg:col-span-8">
                      <p className="text-sm md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic opacity-90 border-l-4 border-primary/30 pl-5 md:pl-8 py-2">
                        "{selectedEntity.description}"
                      </p>
                    </div>
                    <div className="lg:col-span-4 flex justify-center lg:justify-end">
                      <button className="w-full sm:w-auto px-10 md:px-14 py-4 md:py-5 bg-primary text-background-dark font-black rounded-2xl md:rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 text-xs md:text-sm uppercase tracking-widest">
                        Join this hive
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Localized Activity Feed Header */}
              <div className="flex items-center gap-6 py-4">
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent"></div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-rounded text-primary text-lg">cyclone</span>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Hive Activity Feed</h3>
                </div>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent"></div>
              </div>

              {/* Community Feed Rendering */}
              <div className="space-y-6">
                {displayedPosts.length > 0 ? (
                  displayedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => {
                        setSelectedEntity(post);
                        setActiveTab('post-detail');
                      }}
                    />
                  ))
                ) : (
                  <div className="ios-glass ios-glass-border p-16 text-center rounded-[2.5rem] opacity-70">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-rounded text-4xl text-slate-300">inventory_2</span>
                    </div>
                    <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">This field is currently quiet...</p>
                    <p className="text-slate-400 text-sm mt-2">Be the first to gather pollen in this community.</p>
                    <button className="mt-8 px-6 py-3 bg-white/50 dark:bg-white/5 border border-white/20 rounded-xl font-bold text-xs hover:bg-primary/10 hover:text-primary transition-all">
                      CREATE FIRST HIVE
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'post-detail' && selectedEntity ? (
            <PostView post={selectedEntity} onBack={() => setActiveTab('feed')} />
          ) : (
            <>
              {['feed', 'trending'].includes(activeTab) && (
                <div className="space-y-6">
                  {displayedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => {
                        setSelectedEntity(post);
                        setActiveTab('post-detail');
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <RightSidebar
          className="lg:col-span-3"
          onCommunityClick={(comm) => {
            setSelectedEntity(comm);
            setActiveTab('community-detail');
          }}
          communities={MOCK_COMMUNITIES}
          selectedCommunity={activeTab === 'community-detail' ? selectedEntity : null}
        />
      </main>
    </div>
  );
}

export default App;
