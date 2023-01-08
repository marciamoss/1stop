const router = require("express").Router();
const userCrud = require("../utils/user-crud");

router.route("/")
  .post(userCrud.create);

router
  .route("/:id")
  .get(userCrud.findUser);

module.exports = router;
