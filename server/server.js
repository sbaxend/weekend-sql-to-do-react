const express = require('express');
const app = express();
const todoRouter = require('./routes/todo.router.js');
const PORT = process.env.PORT || 5001;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // needed for axios requests
app.use(express.static('build'));
//app.use(express.static(__dirname + '/public', { 'Content-Type': 'application/javascript' }));


/** ---------- EXPRESS ROUTES ---------- **/
app.use('/todo', todoRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});