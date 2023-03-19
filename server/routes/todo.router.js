const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    console.log('GET Request made for /todo_list');
    
    let queryText = 'SELECT * FROM "todo_list";';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        // ! ALWAYS include this
        console.log(`Error in GET ${error}`);
        //tells the client something went wrong
        res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
    console.log('POST Request made for /todo');
    // Any data we send from the client is available
    // as a property of req.body.
    console.log(req.body);
    let taskToAdd = req.body;
    // ! Never use template literal to enter strings
    // using $1, $2, $3, etc will sanatize the input. helps against malicious people
    let queryText = `INSERT INTO "todo_list" ("task", "due", "notes")
                    VALUES ($1, $2, $3);`
    //                          $1                  $2                  $3
    pool.query(queryText, [taskToAdd.task, taskToAdd.due, taskToAdd.notes]).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error in POST ${error}`);
        res.sendStatus(500);
    })
});
// PUT
router.put('/:id', (req, res) => {
    console.log('In PUT request /todo');
    let taskId = req.params.id;
    let taskToEdit = req.body;
    console.log(taskToEdit);
    let queryText = `UPDATE "todo_list" SET "status" = $1 WHERE "id" = $2`;
    if (taskToEdit.ready_to_transfer === 'false') {
        pool.query(queryText, [true, taskId]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            res.sendStatus(500);
        });
    } else {
        pool.query(queryText, [false, taskId]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            res.sendStatus(500);
        });
    };
});

// DELETE
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const deleteIndex = Number(req.params.id);
    let queryText = 'DELETE FROM "todo_list" WHERE "id" = $1'
    pool.query(queryText, [deleteIndex]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`ERROR in DELETE'${error}`)
        res.sendStatus(500);
    });
})


module.exports = router;
