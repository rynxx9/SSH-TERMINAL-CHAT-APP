import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data.json');

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data.json:", err);
        return { posts: [], communities: [] };
    }
};

// Routes
app.get('/api/posts', (req, res) => {
    const data = readData();
    res.json(data.posts);
});

app.get('/api/communities', (req, res) => {
    const data = readData();
    res.json(data.communities);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
