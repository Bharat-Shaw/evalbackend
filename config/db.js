const mongoose=require('mongoose');

// const connection=mongoose.connect('mongodb://127.0.0.1:27017/spr3Eval');
const connection=mongoose.connect('mongodb+srv://bharat:bharat1234@todo.wp7htio.mongodb.net/?retryWrites=true&w=majority');

module.exports={connection};