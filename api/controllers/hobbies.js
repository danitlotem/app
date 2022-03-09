const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

module.exports = {
  getUserHobbies: (req, res) => {
    mySqlConnection.query(
      "SELECT* from hobbies WHERE user_id=?",
      [req.params.userid],
      (err, rows) => {
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  },
  createUserHobbies: (req, res) => {
    let user_id = req.params.userid;
    let hobby = req.body.hobby;

    mySqlConnection.query(
      `INSERT INTO hobbies (user_id, hobby) VALUES ("${user_id}","${hobby}")`,
      (err, result) => {
        if (!err) {
          res.send("hobby of user added successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  deleteUserHobbies: (req, res) => {
    mySqlConnection.query(
      "DELETE FROM hobbies WHERE user_id=?",
      req.params.userid,
      (err, resuls) => {
        if (!err) {
          res.send("hobby deleted successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  updateUserHobbies: (req, res) => {
    mySqlConnection.query(
      "UPDATE hobbies SET hobby=? WHERE user_id=?",
      [req.body.hobby, req.params.userid],
      (err, result) => {
        if (!err) {
          res.send("hobby updated successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
};
