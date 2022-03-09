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
const usersRoutes = require('./api/routes/users_route');
const userConfigurationRoutes=require('./api/routes/userConfiguration_route');
const hobbiesRoutes = require('./api/routes/hobbies_route');
const userPicturesRoutes = require('./api/routes/userPictures_route');
const authRoutes = require('./api/routes/auth_route');
const chatsRoutes = require("./api/routes/chats_route");
const filtersRoutes = require("./api/routes/filters_route");
const connectionsRoutes = require("./api/routes/connections_route");
const notificationsRoutes = require("./api/routes/notifications_route");

app.use('/users',usersRoutes);
app.use('/userConfiguration',userConfigurationRoutes);
app.use('/hobbies',hobbiesRoutes);
app.use('/userPictures',userPicturesRoutes);
app.use('/auth',authRoutes);
app.use("/chats", chatsRoutes);
app.use("/filters", filtersRoutes);
app.use("/connections", connectionsRoutes);
app.use("/notifications", notificationsRoutes);

