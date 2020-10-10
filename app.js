const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const port = process.env.PORT|| 3300;

const app = express();

const userRoutes = require('./routes/user');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/user', userRoutes);


app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

mongoose.connect("Your_mongoDB_URL_goes_here",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(()=>{
        console.log('Connection to DB');
        app.listen(port,
             ()=>{
                console.log(`listening on port${port}`);
            }
        );
    }).catch(err=>{
    console.log(err);
});
