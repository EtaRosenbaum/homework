import express from 'express';
import debug from 'debug';
debug('recipes-api:router');
import pool from '../pool.js'
const router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route('/').get(async (req, res, next) => {
  debug('serving index');

  try {
    const [results] = await pool.execute('SELECT id, name,category FROM recipes');
    res.json(results);
  } catch (err) {
    return next(err);
  }
}).post(async (req, res, next) => {
  try {
    const [results] = await pool.execute('INSERT INTO recipes(name, category) VALUES(?,?)', [req.body.name, req.body.category]);
    console.log(results);
    req.body.id = results.insertId;

    res.status(201).location(`/recipes-api${req.body.id}`).json(req.body);

  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  debug(`serving ${req.params.id}`);

  try {
    const [results] = await pool.execute(`SELECT name, category FROM recipes WHERE id = ?`, [req.params.id]);

    if (!results.length) {
      res.statusCode = 404;
      return res.send(`Cant find recipe ${req.params.id}`);
    }
    res.json(results[0]);
  } catch (err) {
    return next(err)
  }
}).put(async (req, res, next) => {
  debug(`updating for ${req.params.id}`);
  try {
    const [results] = await pool.execute(`UPDATE recipes SET name = ?, category = ? WHERE id = ?`, [req.body.name, req.body.category, req.params.id]);
    if (!results.affectedRows) {
      res.statusCode = 404;
      return res.send(`404 - Can't find recipe ${req.params.id}`);
    }
    res.statusCode = 204;
    res.end();
  } catch (err) {
    return next(err);
  }
}).delete(async (req, res, next) => {
  debug(`deleting ${req.params.id}`);


  try {
    const [results] = await pool.execute(`DELETE FROM recipes WHERE id = ?`, [req.params.id]);

    if (!results.affectedRows) {
      res.statusCode = 404;
      return res.send(`404 - Can't find recipe ${req.params.id}`);
    }
    res.statusCode = 204;
    res.end();
  } catch (err) {
    return next(err);
  }
});


router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

export default router;