const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencodeParser = bodyParser.urlencoded({extended:false});
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
});
sql.query("use nodejs");

//Template engine
app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));


//Routes and Templates
app.get("/",function(req,res){
    if(!req.params.id){
        sql.query("SELECT * FROM user",function(err,results,fields){
            res.render('index',{data:results});
        });
    }
});

app.get("/inserir",function(req,res){
    res.render('inserir');
});

// app.get("/listar/:id?",function(req,res){
//     if(!req.params.id){
//         sql.query("SELECT * FROM user",function(err,results,fields){
//             res.render('listar',{data:results});
//         });
//     }else{
//         sql.query("SELECT * FROM user WHERE id=?", [req.params.id],function(err,results,fields){
//             res.render('index',{data:results});
//         });
//     }
// });

app.post("/controllerInserir",urlencodeParser,function(req,res){
    sql.query("INSERT INTO user (nome, email) VALUES (?,?)", [req.body.nome, req.body.email]);
    //res.render('controllerInserir',{nome:req.body.nome});
    res.redirect('/');
});

app.get("/atualizar/:id",function(req,res){
    sql.query("SELECT * FROM user WHERE id=?",[req.params.id],function(err,results,fields){
        res.render('atualizar',{data:req.params.id, nome:results[0].nome, email:results[0].email});
    });
});
app.post("/atualizar/controllerAtualizar",urlencodeParser,function(req,res){
    sql.query("UPDATE user SET nome=?, email=? WHERE id=?",[req.body.nome, req.body.email, req.body.id]);
    //res.render('controllerAtualizar');
    res.redirect('/');
});

app.get("/eliminar/:id",function(req,res){
    sql.query("DELETE FROM user WHERE id=?",[req.params.id]);
    res.redirect("/");
});


//Start server
app.listen(3000,function(req,res){
    console.log('Servidor está rodando...');
});