import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const name = req.cookies.userName || '';
  res.render('index', { title: 'Express', name, count: res.locals.count });
});

router.get('/name', (req, res, next) => {
  const name = req.cookies.userName || '';
  res.render('name', { title: 'Enter Name', name, count: res.locals.count });
});

router.post('/name', (req, res, next) => {
  const name = req.body.userName;
  res.cookie('userName', name, {
    httpOnly: true,
    maxAge: 120000
  });
  res.redirect('/name');
})

export default router;