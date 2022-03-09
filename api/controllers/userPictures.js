//const mysql=require("mysql");
const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

module.exports = {
  getUserPictures: (req, res) => {
    mySqlConnection.query(
      "SELECT* from user_pictures WHERE user_id=?",
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
  createUserPicture: (req, res) => {
    let user_id = req.params.userid;
    let picture = req.body.picture;
    let mainPicture = req.body.mainPicture;

    mySqlConnection.query(
      `INSERT INTO user_pictures (user_id, image, main_image) VALUES ("${user_id}","${picture}","${mainPicture}")`,
      (err, result) => {
        if (!err) {
          res.send("picture of user added successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  deleteUserPicture: (req, res) => {
    mySqlConnection.query(
      "DELETE FROM user_pictures WHERE user_id=?",
      req.params.userid,
      (err, resuls) => {
        if (!err) {
          res.send("picture deleted successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  updateUserPicture: (req, res) => {
    mySqlConnection.query(
      "UPDATE user_pictures SET image=?, main_image=? WHERE user_id=?",
      [req.body.image, req.body.main_image, req.params.userid],
      (err, result) => {
        if (!err) {
          res.send("picture updated successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
};
