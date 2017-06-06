var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://hermi:hermi@ds149049.mlab.com:49049/hermi-todo');

var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo',todoSchema);


var data = [{item:'Walk'},{item:'Get'},{item:'Learn'}];

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app) {
    app.get('/todo',function(req , res){
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
        });
        
    });
    
    app.post('/todo',urlencodedParser,function(req , res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
    
    app.delete('/todo/:item',function(req , res){
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });

    });
};