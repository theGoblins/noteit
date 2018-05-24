const db = require('./../db');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

module.exports = {

  createUser: (req, res) => {
    let { name, password } = req.body;
    //let password = req.body.password;

    let promise = new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
          res.send(500);
          return;
        }

        bcrypt.hash(password, salt, function(err, hash) {
          if (err) res.send(500);
          else {
            password = hash;
            resolve();
          }
        });
      });
    });

    promise
      .then(() => {
        let q = `INSERT INTO users(name, password) VALUES ('${name}', '${password}');`;

        db.query(q, (err, results) => {
          if (err) res.send(500);
          else return res.send(true);
        });
      })
      .catch(err => {
        res.send(500);
      });
  },

  checkUser: (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) res.send(500);
      else res.send(results.rows);
    });
  },

  verifyUser: (req, res) => {
    let candidatePassword = req.body.password;
    let password;

    let promiseVerify = new Promise((resolve, reject) => {
      db.query(
        `SELECT password FROM users WHERE (name = '${req.body.name}');`,
        (err, results) => {
          if (err) reject();
          if (results.rows[0] === undefined) {
            return res.send(false);
          } else {
            password = results.rows[0].password;
            resolve();
          }
        }
      );
    });

    promiseVerify
      .then(() => {
        bcrypt.compare(candidatePassword, password, function(err, isMatch) {
          if (err) {
            res.send(500);
          } else if (isMatch) {
            return res.send(true);
          } else if (!isMatch) {
            return res.send(false);
          }
        });
      })
      .catch(err => {
        res.send(500);
      });
  },
  
  verifyUsername: (req, res, next) => {
    if (req.body.name && req.body.password) {
      db.query(
        `SELECT password FROM users WHERE (name = '${req.body.name}');`,
        (err, results) => {
          if (results.rowCount > 0) {
            return res.send('This username already exists.');
          } else {
            next();
          }
        }
      );
    } else {
      return res.send("The username or password can't be empty");
    }
  },
};
