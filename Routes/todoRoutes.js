var express = require('express');
var bodyParser = require('body-parser');
var sql = require("mssql");

var routes = function (todoRouter) {

    todoRouter.route('/')
        .post(function (req, res) {

            // config for your database
            var config = {
                user: 'sa',
                password: 'admin',
                server: 'localhost\\SQLEXPRESS',
                database: 'AngularTodoes'
            };

            // connect to your database
            sql.connect(config, function (err) {

                if (err) { res.status(500).send(err); }
                sql.query`INSERT INTO dbo.Todoes (Text, DueDate, Priority)
                  VALUES (${req.body.Text}, ${req.body.DueDate}, ${req.body.Priority})`.then(function (recordset) {
                        //console.log(recordset);
                        res.status(201).send(recordset);
                    }).catch(function (err) {
                        res.status(500).send(err);
                    })
            });
        })
        .get(function (req, res) {
            //console.log(req.query.id);

            // config for your database
            var config = {
                user: 'test2',
                password: 'test2',
                server: 'localhost\\SQLEXPRESS',
                database: 'AngularTodoes'
            };

            // connect to your database
            sql.connect(config, function (err) {

                if (err) console.log(err);

                // create Request object
                var request = new sql.Request();

                // query to the database and get the records
                request.query('select * from dbo.Todoes', function (err, recordset) {

                    if (err) { res.status(500).send(err); }

                    // send records as a response
                    res.send(recordset);

                });
            });
        });
    todoRouter.route('/:todoId')
        .get(function (req, res) {
            var id = req.params.todoId;

            // config for your database
            var config = {
                user: 'test2',
                password: 'test2',
                server: 'localhost\\SQLEXPRESS',
                database: 'AngularTodoes'
            };

            // connect to your database
            sql.connect(config, function (err) {

                if (err) { res.status(500).send(err); }

                // query to the database and get the records
                sql.query`select * from dbo.Todoes where id = ${id}`.then(function (recordset) {
                    res.send(recordset);
                }).catch(function (err) {
                    if (err) { res.status(500).send(err); }
                });
            });
        })
        .put(function (req, res) {
            var id = req.params.todoId;

            // config for your database
            var config = {
                user: 'test2',
                password: 'test2',
                server: 'localhost\\SQLEXPRESS',
                database: 'AngularTodoes'
            };

            // connect to your database
            sql.connect(config, function (err) {

                if (err) { res.status(500).send(err); }
                sql.query`UPDATE dbo.Todoes 
                  SET Text = ${req.body.Text}, DueDate = ${req.body.DueDate}, Priority = ${req.body.Priority}
                  WHERE Id = ${id}`.then(function (recordset) {

                        res.status(201).send(recordset);
                    }).catch(function (err) {
                        res.status(500).send(err);
                    })
            });
        })
        .patch(function (req, res) {
            var id = req.params.todoId;

            var config = {
                user: 'sa',
                password: 'admin',
                server: 'localhost\\SQLEXPRESS',
                database: 'AngularTodoes'
            };

            sql.connect(config, function (err) {

                if (err) { res.status(500).send(err); }
                sql.query`UPDATE dbo.Todoes SET Priority = ${req.body.Priority} WHERE Id = ${id}`.then(function (recordset) {
                    //console.log(recordset);
                    res.status(201).send(recordset);
                }).catch(function (err) {
                    res.status(500).send(err);
                })
            });

        })
        .delete(function (req, res) {
            var id = req.params.todoId;

            var config = {
                user: 'test2',
                password: 'test2',
                server: 'localhost\\SQLEXPRESS',
                database: 'AngularTodoes'
            };

            sql.connect(config, function (err) {

                if (err) { res.status(500).send(err); }
                sql.query`DELETE from dbo.Todoes WHERE Id = ${id}`.then(function (recordset) {
                    //console.log(recordset);
                    res.status(204).send('Deleted');
                }).catch(function (err) {
                    res.status(500).send(err);
                })
            });
        })

    return todoRouter;
}

module.exports = routes;
