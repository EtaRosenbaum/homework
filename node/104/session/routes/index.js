import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
      title: 'Express',
      partials:{
        content: 'index'
      }

    });
});
router.post('/', function(req, res, next){
  req.session.name = req.body.name;
  res.redirect('/');
});

export default router