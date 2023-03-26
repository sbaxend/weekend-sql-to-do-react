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
router.put('/:id/status', (req, res) => {
    console.log('In PUT request /todo');
    //this is setting a variable to the ID sent over from the function
    let taskId = req.params.id;
    console.log(taskId)
    // you can set a variable to SQL select
    let getStatusQuery = `SELECT "status" FROM "todo_list" WHERE "id" = $1`;
    //this ^^ selects status from todo list to id which will be added next
    pool.query(getStatusQuery, [taskId]).then((result) => {
        let currentStatus = result.rows[0].status;
        //^^ this set a variable to grab the status results from the getStatusQuery 
        let newStatus = currentStatus === 'Complete' ? 'Incomplete' : 'Complete';
       // ^^^ this a shorthand if else conditional which sets the new status variable to the if else
        let queryText = `UPDATE "todo_list" SET "status" = $1 WHERE "id" = $2`;

        //below is sending the query text with the values of newStatus and taskId(the id we sent over )
        pool.query(queryText, [newStatus, taskId]).then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(`Error in PUT ${error}`);
            res.sendStatus(500);
        });
    }).catch((error) => {
        console.log(`Error in PUT ${error}`);
        res.sendStatus(500);
    });

});

// ANOTHER PUT for EDIT


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
