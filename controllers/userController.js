

const pg = require('pg');
require('dotenv').config();
const bodyParser = require('body-parser');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const client = new pg.Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
  ssl: true
});

client.connect(function(err) {
  if(err) console.log("client connect: ", err);
})

const userController = {

  createUser : (req, res, next) => {
    console.log(req.body);

    if(req.body.name && req.body.password) {


      let { name, password } = req.body;
      //let password = req.body.password;

      let promise = new Promise((resolve, reject) => {

      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return console.log("Salt gen: ", err);
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return console.log("Hash gen: ", err);
          else {
              password = hash;
              resolve();
            }
        });
    });
})
        
        promise.then(() =>{
        console.log("hashed password: ", password);
        let q = `INSERT INTO users(name, password) VALUES ('${name}', '${password}');`;
        console.log("Our query is read: ", q);

        client.query(q, (err, results) => {
          if (err) console.log(err);
          else console.log(results);
        });
        next();
        }).catch(err =>{
            console.log("err promise: ", err);

        })
    }
    else {
        res.redirect(400, '/signup');
        res.end();
    }

    // client.end();
      // });
  // Promise.all(promise)
  // .then(() => {
  //   console.log("Promise got resolved");
  //   db.end()
  // })
  // .catch((err) => {
  //   console.log("Error promise", err)});
},

  checkUser : (req, res) => {

  client.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.log(err);
  } else {
    res.send(results.rows);
  }

});
  },

verifyUser : (req, res) => {
    let candidatePassword = req.body.password;
    let password;

    let promiseVerify = new Promise((resolve, reject) => {

    client.query(`SELECT password FROM users WHERE (name = '${req.body.name}');`, (err, results) => {
        console.log("username: ", req.body.name)
        if (err) reject();
        if(results.rows[0] === undefined){
            console.log("result: ", results);
            res.redirect(400, '/login');
            }
        else{
            password = results.rows[0].password;
            console.log("password: ", password);
            resolve();
        }
        
    });
    
});

    console.log("CandidatePassword: ", candidatePassword);


    promiseVerify.then(() => {
    bcrypt.compare(candidatePassword, password, function(err, isMatch) {
            if (err) console.log("compare error: ", err);
            else if (isMatch) res.redirect(200, '/secret');
            else if(!isMatch) res.redirect(400, '/login');
        });
    }).catch(err =>{
        console.log("err promiseVerify: ", err);
    });
    // client.end();

    }
}

module.exports = userController; 
/*
  _id         serial,
  name        VARCHAR(32) PRIMARY KEY,
  password    VARCHAR(255) NOT NULL,
  created     timestamptz,
  updated     timestamptz
*/
