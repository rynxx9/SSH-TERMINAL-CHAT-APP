import React, { useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import RightSidebar from './components/layout/RightSidebar';
import PostCard from './components/feed/PostCard';
import LandingPage from './components/auth/LandingPage';
import PostView from './components/feed/PostView';
import CommunitiesView from './components/feed/CommunitiesView';

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
  },
  {
    id: 9,
    title: "How to use Tailwind with Next.js 15?",
    excerpt: "I am trying to setup a new project and I am a bit confused about the new directory structure. Any tips?",
    author: "yassine_dev",
    tag: "ma/WebDev_MA",
    time: "1h ago",
    votes: 120,
    comments: 15
  },
  {
    id: 10,
    title: "Best LLMs for Arabic Dialects (Darija)?",
    excerpt: "Has anyone tried fine-tuning Llama-3 for Moroccan Darija? Looking for datasets or experiences.",
    author: "omar_ai",
    tag: "ma/AI_Morocco",
    time: "4h ago",
    votes: 240,
    comments: 32
  },
  {
    id: 11,
    title: "Junior Frontend Developer opening in Casablanca",
    excerpt: "Innovative startup looking for a React enthusiast. Remote friendly. DM for details!",
    author: "fatima_hr",
    tag: "ma/JobHunting",
    time: "6h ago",
    votes: 85,
    comments: 12
  }
];

const MOCK_COMMUNITIES = [
  {
    id: 'ma/WebDev_MA', members: '12.4k', posts: '1.2k', color: 'bg-emerald-500/20 text-emerald-500',
    banner: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    tags: ['React', 'JavaScript', 'NodeJS', 'Fullstack'],
    description: 'The official home for web developers in Morocco. React, Vue, Node, and more!',
    beekeepers: [
      { name: 'Amine_JS', stats: '940 Honey', role: 'Hive Architect', activity: 'Building cells' },
      { name: 'Sara_Dev', stats: '820 Honey', role: 'Elite Guard', activity: 'Securing nectar' },
      { name: 'Karim_BK', stats: '500 Honey', role: 'Royal Scout', activity: 'Scouting pollen' }
    ],
    topHivers: [
      { name: 'Yassine_Dev', stats: '2.4k Nectar', role: 'Master Gatherer', activity: 'Collecting fast' },
      { name: 'Meryem_Code', stats: '1.8k Nectar', role: 'Busy Worker', activity: 'Storing honey' },
      { name: 'Anas_Web', stats: '1.2k Nectar', role: 'Pollen Seeker', activity: 'Scanning fields' }
    ]
  },
  {
    id: 'ma/AI_Morocco', members: '8.2k', posts: '850', color: 'bg-orange-500/20 text-orange-500',
    banner: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    tags: ['AI', 'ML', 'Python', 'Intelligence'],
    description: 'Exploring the future of Artificial Intelligence in the Kingdom. LLMs, Data Science, and ML.',
    beekeepers: [
      { name: 'Omar_AI', stats: '1.2k Honey', role: 'Neural Beekeeper', activity: 'Training drones' },
      { name: 'Laila_Data', stats: '980 Honey', role: 'Data Guardian', activity: 'Sorting pollen' }
    ],
    topHivers: [
      { name: 'Tariq_ML', stats: '3.1k Nectar', role: 'Model Collector', activity: 'Optimizing flow' },
      { name: 'Driss_Bot', stats: '2.2k Nectar', role: 'Logic Scout', activity: 'Mapping fields' }
    ]
  },
  {
    id: 'ma/JobHunting', members: '15.1k', posts: '3.4k', color: 'bg-blue-500/20 text-blue-500',
    banner: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    tags: ['Jobs', 'Careers', 'Startups', 'Recruitment'],
    description: 'Find your next career move. Remote jobs, local startups, and interview tips.',
    beekeepers: [
      { name: 'Fatima_HR', stats: '2.1k Honey', role: 'Talent Queen', activity: 'Hiring scouts' },
      { name: 'Youssef_J', stats: '1.4k Honey', role: 'Career Guard', activity: 'Opening cells' }
    ],
    topHivers: [
      { name: 'Amal_Career', stats: '5.2k Nectar', role: 'Lead Seeker', activity: 'Finding nectar' },
      { name: 'Saad_Remote', stats: '4.1k Nectar', role: 'Digital Nomad', activity: 'Scouting out' }
    ]
  },
  {
    id: 'ma/Frontend', members: '5.6k', posts: '420', color: 'bg-indigo-500/20 text-indigo-500',
    banner: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    tags: ['UI', 'UX', 'CSS', 'Design'],
    description: 'Focusing on the beauty of the web. UI/UX, CSS, and modern framework discussions.',
    beekeepers: [
      { name: 'Reda_UI', stats: '880 Honey', role: 'Visual Architect', activity: 'Styling cells' },
      { name: 'Zineb_G', stats: '750 Honey', role: 'Design Queen', activity: 'Polishing wax' }
    ],
    topHivers: [
      { name: 'Mehdi_CSS', stats: '1.9k Nectar', role: 'Style Master', activity: 'Painting wings' },
      { name: 'Ines_Pixel', stats: '1.4k Nectar', role: 'Pixel Collector', activity: 'Filtering nectar' }
    ]
  },
  {
    id: 'ma/Python_MA', members: '4.3k', posts: '310', color: 'bg-amber-500/20 text-amber-500',
    banner: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
    tags: ['Python', 'Backend', 'Scripting', 'Automation'],
    description: 'The Pythonista community of Morocco. Backend, Automation, and Scripting.',
    beekeepers: [
      { name: 'Hassan_Py', stats: '1.1k Honey', role: 'Snake Charmer', activity: 'Scripting flow' },
      { name: 'Nora_Snake', stats: '920 Honey', role: 'Script Guardian', activity: 'Checking cells' }
    ],
    topHivers: [
      { name: 'Adil_Algo', stats: '2.8k Nectar', role: 'Logic Keeper', activity: 'Solving paths' },
      { name: 'Siham_Flask', stats: '2.1k Nectar', role: 'API Scout', activity: 'Routing pollen' }
    ]
  },
  {
    id: 'ma/OpenSource', members: '2.9k', posts: '150', color: 'bg-emerald-600/20 text-emerald-600',
    banner: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
    tags: ['OpenSource', 'Github', 'FOSS', 'Community'],
    description: 'Building together. Contribute to Moroccan projects and share your own.',
    beekeepers: [
      { name: 'Smail_OSS', stats: '3.4k Honey', role: 'Kernel Guard', activity: 'Merging wax' },
      { name: 'Idriss_G', stats: '2.1k Honey', role: 'Repo Master', activity: 'Forking fields' }
    ],
    topHivers: [
      { name: 'Brahim_K', stats: '8.4k Nectar', role: 'Main Collector', activity: 'Pushing pollen' },
      { name: 'Salma_Commit', stats: '6.2k Nectar', role: 'Code Scout', activity: 'Commiting honey' }
    ]
  }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'trending', 'communities', 'community-detail', 'post-detail'
  const [selectedEntity, setSelectedEntity] = useState(null);

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const getFilteredPosts = () => {
    let posts = [...MOCK_POSTS];
    if (activeTab === 'trending') {
      return posts.sort((a, b) => b.votes - a.votes);
    }
    if (activeTab === 'community-detail' && selectedEntity) {
      return posts.filter(p => p.tag === selectedEntity.id);
    }
    return posts;
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
          communities={MOCK_COMMUNITIES}
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
              communities={MOCK_COMMUNITIES}
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
