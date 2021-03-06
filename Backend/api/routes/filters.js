const express = require("express");
const router = express.Router();

const {
  getAllFilters,
  getUserFilter,
  getUsersWithCommonHobbiesFilter,
  getUsersWithCommonGenderFilter,
  getUsersWithCommonRelationshipFilter,
  getUsersWithCommonInterestingInFilter,
  getUsersWithCommonAgeFilter,
  createUserFilter,
  updateUserGenderFilter,
  updateUserRelationshipFilter,
  updateUserInterestingInFilter,
  updateUserAgeFilter,
  deleteUserFilter,
} = require("../controllers/filters");

router.get("/", getAllFilters); //get all chats (/chats)
router.get("/:userid", getUserFilter); //get a chat by A_userid and B_userid (/chats/:useridA/:useridB)
router.get("//hobbies", getUsersWithCommonHobbiesFilter);
router.get("//gender", getUsersWithCommonGenderFilter);
router.get("//relationship", getUsersWithCommonRelationshipFilter);
router.get("//interestingIn", getUsersWithCommonInterestingInFilter);
router.get("//age", getUsersWithCommonAgeFilter);
router.post("/:userid", createUserFilter); //post a chat (/chats/:useridA/:useridB)
router.put("/update/gender/:userid", updateUserGenderFilter);
router.put("/update/relationship/:userid", updateUserRelationshipFilter);
router.put("/update/interestingIn/:userid", updateUserInterestingInFilter);
router.put("/update/age/:userid", updateUserAgeFilter);
router.delete("/:userid", deleteUserFilter); //delete a chat (/chats/:useridA/:useridB)

module.exports = router;
