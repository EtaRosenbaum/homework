import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session'



import indexRouter from './routes/index.js';



const app = express();

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  res.locals.name = req.session.name ?? 'Please enter your name';
  next();
});


app.use('/visits', (req, res) => {
  let visits = req.session.visits || 0;
  if (!req.session.visits) {
    req.session.visits = 1;
  } else {
    req.session.visits++;
  }
  res.send(`You have visited this page ${visits + 1} times.`);
});

app.get('/names', (req, res, next) => {
  res.render('layout', {
    title: 'Names',
    partials: {
      content: 'names'
    }
  });
});



// view engine setup
const __dirname = import.meta.dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;