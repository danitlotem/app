const express = require('express');
const router = express.Router();

const {
    getAllUsers, 
    getOneUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/users');


router.get('/',getAllUsers); //get all users (/users/)
router.get('/:userid',getOneUser); //get user by appid (/users/:appid)
router.post('/', createUser); //post (/users/)
router.delete('/:userid', deleteUser) //delete user (/users/:appid)
router.put('/:userid', updateUser)

module.exports=router;