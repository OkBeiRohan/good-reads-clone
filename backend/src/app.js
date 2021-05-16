const express = require('express')
const cockieParser = require('cookie-parser')
var cors = require('cors')
var morgan = require('morgan')
const app = express();
const path = require('path');
const userRouter = require('./routes/user.route')
const userPageRoute = require('./routes/userPage.route');
const authorRouter = require('./routes/author.route')
const bookRouter = require('./routes/book.route')
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/goodreads' ;
const categoriesRouter = require('./routes/categories.route')
const adminRouter = require('./routes/admin.route')

const mongoose = require('mongoose');

app.use(cockieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/images', express.static(path.join(__dirname, 'uploads')))


mongoose.connect(DB_URL,{
    useNewUrlParser: true ,
    useUnifiedTopology: true
},(err)=>{
    if(!err){
        return console.log("Sucessfully Connected DataBase")
    }
   else{ console.log(err);}
})


app.use('/user', userRouter)
app.use('/userpage' , userPageRoute);
app.use('/categories', categoriesRouter);
app.use('/author', authorRouter)
app.use('/book', bookRouter)
app.use('/admin',adminRouter)
//app.use('/uploads', express.static('uploads'));
app.listen(PORT, () =>
    console.log(`server is listening at port ${PORT}`)
    
)


