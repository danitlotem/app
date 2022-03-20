//const mysql=require("mysql");
const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

module.exports = {
  getUserConfiguration: (req, res) => {
    mySqlConnection.query(
      "SELECT* from user_configuration WHERE user_id=?",
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
  createUserConfiguration: (req, res) => {
    let user_id = req.params.userid;
    let relationship_status = req.body.relationship_status;
    let search_mode = req.body.search_mode;
    let sexual_orientation = req.body.sexual_orientation;
    let profession = req.body.profession;
    let pronoun = req.body.pronoun;
    let interested_in = req.body.interested_in;
    let radius = req.body.radius;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;

    mySqlConnection.query(
      `INSERT INTO user_configuration (user_id, relationship_status, search_mode, sexual_orientation, profession, pronoun, interested_in, 
        radius, longitude, latitude) VALUES
         ("${user_id}","${relationship_status}","${search_mode}","${sexual_orientation}","${profession}","${pronoun}",
         "${interested_in}","${radius}","${longitude}","${latitude}")`,
      (err, result) => {
        if (!err) {
          res.send("user configuration of user added successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  deleteUserConfiguration: (req, res) => {
    mySqlConnection.query(
      "DELETE FROM user_configuration WHERE user_id=?",
      req.params.userid,
      (err, resuls) => {
        if (!err) {
          res.send("user configuration deleted successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
  updateUserConfiguration: (req, res) => {
    let user_id = req.params.userid;
    let relationship_status = req.body.relationship_status;
    let search_mode = req.body.search_mode;
    let sexual_orientation = req.body.sexual_orientation;
    let profession = req.body.profession;
    let pronoun = req.body.pronoun;
    let interested_in = req.body.interested_in;
    let radius = req.body.radius;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    mySqlConnection.query(
      "UPDATE user_configuration SET relationship_status=?, search_mode=?, sexual_orientation=?, profession=?," +
        "pronoun=?, interested_in=?, radius=?, longitude=?, latitude=? WHERE user_id=?",
      [
        relationship_status,
        search_mode,
        sexual_orientation,
        profession,
        pronoun,
        interested_in,
        radius,
        longitude,
        latitude,
        user_id,
      ],
      (err, result) => {
        if (!err) {
          res.send("user configuration updated successfully");
        } else {
          console.log(err);
        }
      }
    );
  },
};
