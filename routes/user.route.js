const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();


/**
   * @api {get} /random random user
   * @apiDescription Get a random user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} a user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */

router
  .route("/random")
  .get(userController.getRandomUser)

  /**
   * @api {get} /all get all user
   * @apiDescription get all user
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} Post a user.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  router
  .route('/all')
  .get(userController.getAllUser);

  // save an user 
  router
  .route('/save')
  .post(userController.saveAnUser);

  // update an user 
  router
  .route('/update/:id')
  .patch(userController.updateAnUser);
  
  // delete an user 
  router
  .route('/delete/:id')
  .delete(userController.deleteUser);

  // update multiple user
  router
  .route('/bulkupdate') 
  .patch(userController.bulkUpdate);

router
  .route("/:id")
  .get(userController.getRandomUser)
  .delete(userController.deleteUser);

module.exports = router;
