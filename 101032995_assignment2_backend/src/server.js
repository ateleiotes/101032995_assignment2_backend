const express = require('express')

const prser = require('body-parser')

const mongoose = require('mongoose')

const employeeRouter = require('./routes/employeeRoutes.js') 

// DB connection url string

const db_url = "mongodb+srv://kg:Assignment2@a2cluster.g2h4x.mongodb.net/studentid_assignment2?retryWrites=true&w=majority"

const app = express();

app.use(prser.urlencoded({ extended: true }))
app.use(prser.json())
app.use(express.json());



// Front end access 

var cors = require('cors')
app.use(cors())

// Db connection
mongoose.Promise = global.Promise;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting...', err);
    process.exit();
});

// Router
app.use(employeeRouter);


app.get('/', (req, res) => {
    res.send("<h1>101032995 Request</h1>");
});



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});