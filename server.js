// import some dependencies/packages

// express framework - used for handling HTTP requests/responses
const express = require('express');
// create an instance of the framework
const app = express();
// DBMS Mysql
const mysql = require('mysql2');
// cross origin resource sharing
const cors = require('cors');
// environment variable
const dotenv = require('dotenv')

app.use(express.json());
app.use(cors());
dotenv.config();

// connecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// check for connection
db.connect((err) => {
    // if no connect = no wedding
    if(err) return console.log('Error connecting to MySQL');

    // if yes connect = wedding
    console.log('Connected to MySQL as id:', db.threadId);
})


// GET METHOD CODE GOES HERE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// GET methoda example below

app.get('/data', (req, res) =>{
    // retrieve data from database

    db.query('SELECT * FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data')
        } else{
            // display the patient records to the browser
            res.render('data', {results:results});
        }
    })
})

app.get("/data", (req, res) => {
  // retrieve data from database

  db.query("SELECT * FROM providers", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data");
    } else {
      // display the patient records to the browser
      res.render("data", { results: results });
    }
  });
});

// STOP GET METHOD CODE HERE 

// start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Send a message to the browser
    console.log('Sending message to the browser...')
    app.get('/', (req, res) => {
        res.send('Yay, wedding can proceed, the server started successfully');
    })
})
