const mongoose = require('mongoose');
//connect to db
mongoose.connect('mongodb://localhost/contact_list_db');

//aquire the conn (to check if its successful)
const db=mongoose.connection;

//on error print error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('Succesfully connected to db');
});
