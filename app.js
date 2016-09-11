var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Book = require('./models/bookModel');

var db = mongoose.connect('mongodb://localhost/bookAPI');



var app = express();

var port = process.env.PORT || 1000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


var bookRouter = require('./Routes/bookRoutes')(Book);
var todoRouter = require('./Routes/todoRoutes')(express.Router());

//sql server connection
// var todoRouter = express.Router();
// var ToDoes = require('./mssql')(todoRouter);
// ToDoes(todoRouter);


app.use('/api/books', bookRouter);
app.use('/api/todoes', todoRouter);

app.get('/', function(req, res){
    res.send('Welcome to the Web API');
});

app.listen(port, function(){
    console.log('Running on port ' + port);
})