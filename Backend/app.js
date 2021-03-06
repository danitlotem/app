const express = require('express')
const app = express();
const mysql=require("mysql");
const bodyParser=require("body-parser");
const jwt = require('jsonwebtoken');

module.exports={
    app : app, 
    jwt : jwt
}

// config 
app.use(bodyParser.json());


//routes
const usersRoutes = require('./api/routes/users');
const userConfigurationRoutes=require('./api/routes/userConfiguration');
const hobbiesRoutes = require('./api/routes/hobbies');
const userPicturesRoutes = require('./api/routes/userPictures');
const authRoutes = require('./api/routes/auth');
const chatsRoutes = require("./api/routes/chats");
const filtersRoutes = require("./api/routes/filters");
const connectionsRoutes = require("./api/routes/connections");
const notificationsRoutes = require("./api/routes/notifications");

app.use('/users',usersRoutes);
app.use('/userConfiguration',userConfigurationRoutes);
app.use('/hobbies',hobbiesRoutes);
app.use('/userPictures',userPicturesRoutes);
app.use('/auth',authRoutes);
app.use("/chats", chatsRoutes);
app.use("/filters", filtersRoutes);
app.use("/connections", connectionsRoutes);
app.use("/notifications", notificationsRoutes);

