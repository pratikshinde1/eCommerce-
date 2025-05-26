const express=require('express');
const dotenv=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors = require('cors');

//routes

const userrRoutes=require('./routes/USER')


//environment variable
dotenv.config();

//mongodb connection
//mongodb+srv://sgdm7788:<password>@dilshan.yuhdd4y.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect(
//     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@dilshan.yuhdd4y.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
//     ).then(()=>{
//         console.log('Database Connected');
//     });

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI,{
         });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// Set up CORS headers (for apis getting from front end)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4004');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

// Allow requests from localhost:3000 (our frontend port)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization',
    maxAge: 3600,
  }));



    
// using bodyparser middleware but it is deprecated and added its functionalities in express it self. we will be using this as to get idea about middle ware
//middle wares are use to handling or manipulating the data in the time bettween making , handling the request(between req and res)
app.use(bodyParser());
app.use('/api',userrRoutes);



  app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
  });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});