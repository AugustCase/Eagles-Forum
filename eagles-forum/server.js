const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Question = require('./models/Question');
const Answer = require('./models/Answer');

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const categories = ["Albums", "Band Members", "Tours", "Lyrics", "Trivia"];

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });
      res.json({ token, username: user.username });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/questions/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(questions);
  } catch {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.post('/api/questions', authenticateToken, async (req, res) => {
  try {
    const { category, questionText } = req.body;
    const question = await Question.create({ userId: req.user.id, category, questionText });
    res.status(201).json(question);
  } catch {
    res.status(500).json({ error: 'Failed to create question' });
  }
});

app.get('/api/answers/:questionId', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).sort({ createdAt: 1 });
    res.json(answers);
  } catch {
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
});

app.post('/api/answers', authenticateToken, async (req, res) => {
  try {
    const { questionId, answerText } = req.body;
    const answer = await Answer.create({ userId: req.user.id, questionId, answerText });
    res.status(201).json(answer);
  } catch {
    res.status(500).json({ error: 'Failed to post answer' });
  }
});

// Connect to MongoDB and then start the server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the app if DB connection fails
  });