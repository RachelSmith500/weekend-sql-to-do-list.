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

    router.put("/T/:id", (req, res) => {
    console.log("In Put", req.params.id, req.body);
    let queryText = `
        UPDATE "tasks"
        SET "completed" = 'YES'
        WHERE "id" = $1;
        `;
    pool.query(queryText, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("error in complete", error);
        res.sendStatus(500);
      });
  });

    router.put("/U/:id", (req, res) => {
    console.log("In Put", req.params.id, req.body);
    let queryText = `
        UPDATE "tasks"
        SET "completed" = 'NO'
        WHERE "id" = $1;
        `;
    pool.query(queryText, [req.params.id])
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("error in complete", error);
        res.sendStatus(500);
      });
  });

  router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM "tasks" WHERE "id"=$1;';
    pool.query(sqlText, [req.params.id])
      .then((result) => {
        console.log('task deleted');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log(`Error making database query ${sqlText}`, error);
        res.sendStatus(500); // Good server always responds
      })
  })

module.exports = router;