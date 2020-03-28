const express = require('express');
const path = require('path');
const port=8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app= express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static('assets'));

// creating middleware1

// app.use(function(req,res,next){
//     //next is to call next middleware
//     // console.log("midddleware 1 called");
//     req.Myname="Neha";
//     next();
// });

// // middleware 2
// app.use(function(req,res,next){
//     //next is to call next middleware
//     // console.log("midddleware 2 called");
//     console.log("Myname is : ",req.Myname);
//     next();
// });

var contactList = [
    {
        name : "Bebo",
        phone : "123456789"
    },
    {
        name : "Neha",
        phone :"98765421"
    },
    {
        name : "bleh",
        phone : "234567181"
    }
]

app.get('/',function(req,res){
    
    //console.log("my name from xontroller is: ",req.Myname);

    Contact.find({},function(err,conts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home' , {
            "title" : "Contact List",
            contact_list :  conts
        });

    });
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        'title' : "EJS!!",
        'boom': "yayyyy"
    })
});

app.post('/create', function(req,res){
    // return res.redirect('/practice');
    // console.log(req.body);
    Contact.create(req.body, function(err,newContact){
        if(err){
            console.log(' error in creating a contact!');
            return;
        }
        // console.log('*****',newContact);
        res.redirect('back');
    });
    // return res.redirect('/');
    // return res.redirect('back');   //shortcut to redirect to same page
});

app.get('/delete', function(req,res){
    //get the id from query in the url
    let id = req.query.id;

    //find the cont in db using id and del
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('errir in del');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port, function(err){
    if(err){
        console.log("ERROR",err);
    }
    console.log('My exp server is up and running @:',port);
});