const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks";';
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks GET', error);
      res.sendStatus(500);
    });
  })

module.exports = router;