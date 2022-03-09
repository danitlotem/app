const dbConfig = require("../../config/db_config");
const mySqlConnection = dbConfig;

module.exports = {
  getAllConnections: (req, res) => {
    mySqlConnection.query("SELECT * FROM Connections", (err, rows) => {
      try {
        res.send(rows);
      } catch (err) {
        console.log(err.message);
      }
    });
  },

  getAllConnectedConnections: (req, res) => {
    mySqlConnection.query(
      "SELECT * FROM Connections WHERE connected = 1",
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getUsersConnection: (req, res) => {
    const user_A = req.params.useridA;
    const user_B = req.params.useridB;
    mySqlConnection.query(
      "SELECT * FROM Connections WHERE user_A_id = ? AND user_B_id = ?",
      [user_A, user_B],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getAllUserConnections: (req, res) => {
    const user = req.params.userid;
    mySqlConnection.query(
      "SELECT * FROM Connections WHERE user_A_id = ? OR user_B_id = ?",
      [user, user],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  getAllUserConnectedConnections: (req, res) => {
    const user = req.params.userid;
    mySqlConnection.query(
      "SELECT * FROM Connections WHERE (user_A_id = ? OR user_B_id = ?) AND connected = 1",
      [user, user],
      (err, rows) => {
        try {
          res.send(rows);
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  createUsersConnection: (req, res) => {
    const creationDate = new Date();
    const lastUpdate = new Date();
    const user_A = req.params.useridA;
    const user_B = req.params.useridB;
    //const connected = 0;
    // maybe check if it's mutual and if yes create a parameter connected = 1 if no connected = 0 and put it in the SQL question.
    mySqlConnection.query(
      "INSERT INTO Connections (user_A_id, user_B_id, creation_date, last_update) values (?, ?, ?, ?)" +
        "ON DUPLICATE KEY UPDATE user_A_id = ?, user_B_id = ?, last_update = ?",
      [user_A, user_B, creationDate, lastUpdate, user_A, user_B, lastUpdate],
      (err, result) => {
        try {
          res.send("connection added successfully");
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  deleteUsersConnection: (req, res) => {
    const user_A = req.params.useridA;
    const user_B = req.params.useridB;
    mySqlConnection.query(
      "DELETE FROM Connections WHERE user_A_id = ? AND user_B_id = ?",
      [user_A, user_B],
      (err, result) => {
        try {
          res.send("connection deleted successfully");
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },
};
