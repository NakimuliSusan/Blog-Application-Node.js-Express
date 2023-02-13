import express from 'express';
import mongoose from 'mongoose';
import router from './routes/User-routes';
import routers from './routes/Blog-routes';

const app = express();
// url will be http://localhost:5000/
app.use(express.json())
app.use("/api/user", router)
app.use("/", routers)


const mongoDbConnection = 'mongodb+srv://Mary-Susan:5G9jkYzUCoF09EfA@cluster0.7ufxqhs.mongodb.net/My-First-Application?retryWrites=true&w=majority'


mongoose.connect(
    mongoDbConnection)
    .then(()=>app.listen(5000))
    .then(() => console.log('Connected to database successfully and listening at port 5000')).catch((err)=> console.log(err))


// creating ang endpoint sent to the server via port 5000

// app.use( "/api" , (req,res,next) => {
//      res.send('Hello world')
// })

