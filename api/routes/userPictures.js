const express = require('express');
const router = express.Router();

const {
    getUserPictures, 
    createUserPicture,
    deleteUserPicture,
    updateUserPicture
} = require('../controllers/userPictures');

router.get('/:userid',getUserPictures); //get user by appid (/hobbies/:userid)
router.post('/:userid', createUserPicture); //post (/hobbies/)
router.delete('/:userid', deleteUserPicture) //delete user (/hobbies/:userid)
router.put('/:userid', updateUserPicture); //update user

module.exports=router;