const dbConfig = require("../../config/db_config");
const { getUsersWithCommonRelationshipFilter } = require("./filters");
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

          let userConnections = [];
          const rowsLength = rows.length;

          for(i = 0; i < rowsLength; i++)
          {
            if(!userConnections.includes(rows[i].user_A_id) && rows[i].user_A_id !== parseInt(user, 10)) {
              userConnections.push(rows[i].user_A_id);
            }
            else if(!userConnections.includes(rows[i].user_B_id) && rows[i].user_B_id !== parseInt(user, 10)) {
              userConnections.push(rows[i].user_B_id);
            }
          }

          res.send(userConnections);
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

          let userConnectedConnections = [];
          const rowsLength = rows.length;

          for(i = 0; i < rowsLength; i++)
          {
            if(!userConnectedConnections.includes(rows[i].user_A_id) && rows[i].user_A_id !== parseInt(user, 10)) {
              userConnectedConnections.push(rows[i].user_A_id);
            }
            else if(!userConnectedConnections.includes(rows[i].user_B_id) && rows[i].user_B_id !== parseInt(user, 10)) {
              userConnectedConnections.push(rows[i].user_B_id);
            }
          }

          res.send(userConnectedConnections);
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
   
    mySqlConnection.query(
      "INSERT INTO Connections (user_A_id, user_B_id, creation_date, last_update) values (?, ?, ?, ?)" +
        "ON DUPLICATE KEY UPDATE user_A_id = ?, user_B_id = ?, last_update = ?",
      [user_A, user_B, creationDate, lastUpdate, user_A, user_B, lastUpdate],
      (err, rows) => {
        try {
          if(typeof rows !== 'undefined') // the insert succeed
          {
              mySqlConnection.query(
                `select * from connections where ((user_A_id = ${user_B} and user_B_id = ${user_A}) or 
                (user_A_id = ${user_A} and user_B_id = ${user_B}))`,
                (err, rows) => {
                  if(rows.length === 2)
                  {
                      mySqlConnection.query(
                        `update connections set connected = 1 where 
                          ((user_A_id = ${user_A} and user_B_id = ${user_B}) or
                          (user_A_id = ${user_B} and user_B_id = ${user_A}))`,
                          (err, rows) => {
                            try {
                              res.send(`Congrats! there is a new mutual connection between users ${user_A} and ${user_B}`);
                            } catch (err) {
                              console.log(err.message);
                            }
                          }
                      )
                  }
                  else
                  {
                      res.send(`Not mutual Connection between users ${user_A} and ${user_B} added successfully.`);
                  }
                }
              )
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },

  deleteUsersConnection: (req, res) => {
    const user_A = req.params.useridA;
    const user_B = req.params.useridB;
    const lastUpdate = new Date();

    mySqlConnection.query(
      "DELETE FROM Connections WHERE user_A_id = ? AND user_B_id = ?",
      [user_A, user_B],
      (err, result) => {
        try {
          mySqlConnection.query(
            `select * from connections where user_A_id = ${user_B} and user_B_id = ${user_A}`,
            (err, rows) => {
              try {
                if(rows.length > 0)
                {
                  mySqlConnection.query(
                    `update connections set connected = 0 where
                    user_A_id = ${user_B} and user_B_id = ${user_A}`,
                    (err, rows) => {
                      try {
                        res.send(`Oh no! There is no longer mutual connection between users ${user_A} and ${user_B}`);
                      } catch (err) {
                        console.log(err.message);
                      }
                    }
                  )
                }
                else 
                {
                  res.send(`Connection between users ${user_A} and ${user_B} deleted successfully`)
                }
              } catch (err) {
                console.log(err.message);
              }
            }
          )
        } catch (err) {
          console.log(err.message);
        }
      }
    );
  },
};
