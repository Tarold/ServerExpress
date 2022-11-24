const User = require('./models/UserModels'),
  userController = require('./controlers/userControllers.js');

module.exports = function (app) {
  /**
   *@swagger
   *  /user:
   *     get:
   *       tags: [User]
   *       description: Get all users
   *       responses:
   *         200:
   *           description: "success"
   *           content:
   *             application/json:
   *               schema:
   *                 type: array
   *                 items:
   *                   properties:
   *                     name:
   *                       type: string
   *                       example: yaroslav
   *                     age:
   *                       type: integer
   *                       example: 18
   */
  app.delete(
    '/user/remove-empty-name-age',
    userController.removeEmptyNameOrAge
  );
  app.get('/user/old/', userController.findOneOldest);
  app.get('/user', userController.getListOfUsers);
  app.get('/user/find/:letter', userController.findUserByLetter);
  app.delete('/user/remove/doc', userController.removeEmpty);
  app.get('/user-height', userController.getHeightsUser);
  app.post('/user', userController.addUser);
  app.put('/add-height', userController.addFieldHeight);
  app.get('/user/getavg/', userController.getUsersAvg);
  app.get('/user/:name', userController.getUsersByName);
  app.delete('/user/:userId', userController.removeUser);
  app.put('/user/:userId', userController.updateUser);
  app.get('/user/user-by-age/:from/:to', userController.getUsersByAge);
};
