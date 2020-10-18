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

  router.post('/', (req, res) => {
    console.log('req.body', req.body);
    let taskName = req.body.taskName;
    let priorityLevel = req.body.priorityLevel;
    let completionTimeline = req.body.completionTimeline;
    let completed = req.body.completed;
    let additionalNotes = req.body.additionalNotes;


    let queryText = `INSERT into "tasks"( "task_name", "priority_level", "completion_timeline", "completed", "additional_notes")
    VALUES('${taskName}', ${priorityLevel}, '${completionTimeline}', '${completed}', '${additionalNotes}');`;
    pool.query(queryText).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in post', error);
        res.sendStatus(500);
    });
});

router.put('/completed/:idParam', (req,res) => {
    console.log('in put request', req.body.direction, req.params.idParam );
    let queryText = '';
    // create SQL Query
    if(req.body.direction === "true"){
        queryText = `UPDATE "tasks" SET "completed" = "true" WHERE "id" = $1;`;
    } else {
        queryText = `UPDATE "tasks" SET "completed" = "false" WHERE "id" = $1;`;
    }
    pool.query(queryText, [req.params.idParam]).then((result) => {
        console.log('result from put', result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in put', error);
        res.sendStatus(500);
    });
});

module.exports = router;