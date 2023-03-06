require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: process.env.PASSWORD,
  database: process.env.DB_PROD
})

// Get req
app.get('/', (req, res) => {
  res.send("Welcome to our server")
})

// Create User -- Post route
app.post('/create', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const age = req.body.age
  const country = req.body.country
  const ctc = req.body.ctc
  
  db.query(
    'INSERT INTO employees (name, email, age, country, ctc) VALUES (?, ?, ?, ?, ?)', 
    [name, email, age, country, ctc], 
    (err, result) => {
      if(err) console.log(err)
      else res.send("Values inserted")
    }
  ) 
})

// Get Users -- Get Route
app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.listen(3001, () => {
  console.log("Server up and running")
})