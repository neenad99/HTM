// load modules 
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const authRoute = require('./routes/auth');
const useractionsRoute = require('./routes/useractions');
const verifyTokenRoute = require('./routes/verify-token')

dotenv.config();
const app = express();

//use middlewares

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/user',authRoute);
app.use("/api/user", verifyTokenRoute, useractionsRoute);

var port = process.env.PORT;
const dburl = process.env.CLOUD_MONGO_URI;

mongoose.connect(dburl,{useNewUrlParser: true,useUnifiedTopology: true})
.then(
    ()=>console.log("mongo db connected"))
.catch((err)=>console.log('error in connecting db',err));

//serve front end templates

const uiPath = path.join(__dirname, 'UI');
app.use(express.static(uiPath));

app.get('/', (req, res) => {
    res.sendFile(`${uiPath}/templates/login.html`);
});

// CATCH ALL OTHER ROUTES
app.get('*', (req, res) => res.status(404).json({ message: 'Welcome to Dummy App', error: 'Sorry, this route is not available' }));
app.post('*', (req, res) => res.status(404).json({ message: 'Welcome to Dummy App', error: 'Sorry, this route is not available' }));


app.listen(port,()=>{
    console.log('server running!!');
})