import express from 'express';
import http from 'http';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import {Server} from 'socket.io';
import Posts from './routes/posts.js';
import Authentication from './routes/authentication.js';
import session from 'express-session';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: 'http://localhost:5173'
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false
}));

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.use(async (req, res, next) => {
  try {
    req.db = await client.db('blog');

    req.io = io;

    next();
  } catch (e) {
    next(e);
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/', Authentication);
app.use('/posts', Posts);

app.use(function (req, res, next) {
  const error = new Error('This is not the answer you wanted');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

io.on('connect', () => {
  console.log('socket io connection');
});

httpServer.listen(8080);
