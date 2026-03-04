import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data.json:", err);
        return { posts: [], communities: { trending: [], user: [] } };
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error("Error writing to data.json:", err);
    }
};

// GET /api/posts
app.get('/api/posts', (req, res) => {
    const data = readData();
    res.json(data.posts || []);
});

// POST /api/posts
app.post('/api/posts', (req, res) => {
    const { title, excerpt, author, tag } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const data = readData();
    const newId = data.posts.length > 0 ? Math.max(...data.posts.map(p => p.id || 0)) + 1 : 1;

    const newPost = {
        id: newId,
        title,
        excerpt: excerpt || '',
        author: author || 'Anonymous',
        tag: tag || 'ma/general',
        time: 'Just now',
        votes: 1,
        comments: 0
    };

    // Add to top of list
    data.posts.unshift(newPost);
    writeData(data);

    res.status(201).json(newPost);
});

// PUT /api/posts/:id/vote
app.put('/api/posts/:id/vote', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { action } = req.body; // 'up' or 'down'

    const data = readData();
    const postIndex = data.posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    if (action === 'up') {
        data.posts[postIndex].votes += 1;
    } else if (action === 'down') {
        data.posts[postIndex].votes = Math.max(0, data.posts[postIndex].votes - 1);
    }

    writeData(data);
    res.json(data.posts[postIndex]);
});

// GET /api/communities/sidebar
app.get('/api/communities/sidebar', (req, res) => {
    const data = readData();
    res.json(data.communities || { trending: [], user: [] });
});

// Serve frontend in production
const clientBuildPath = path.join(__dirname, '../dist');
if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
