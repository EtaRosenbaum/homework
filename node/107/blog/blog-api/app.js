import express from 'express';
import http from 'http';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);



app.use((req, res, next) => {
  try {
    const db = client.db('blog');
    req.posts = db.collection('posts');
    next();
  } catch (e) {
    next(e);
  }
});

/*app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/posts', async (req, res, next) => {
  const posts = await req.posts.find()/*.sort({date: 1}).skip(2).limit(2)*/.toArray()
  res.send(posts);
});

app.post('/posts', async (req, res, next) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and Content are required' });
    return;
  }

  try {
    const result = await req.posts.insertOne({
      title,
      content,
      author,
      date: new Date()
    });
    const savedPost = await req.posts.findOne({
      _id: result.insertedId
    });
    res.status(201).json(savedPost);

  } catch (e) {
    next(e);
  }

});

app.use(function (req, res, next) {
  const error = new Error('404. Not found');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.end(err.message);
});


async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    server.listen(8080, () => console.log('Server running on port 8080'));
  } catch (e) {
    console.error('Failed to connect to MongoDB', e);
  }
}

startServer();
