const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");
const roles_list = require("../../config/roles_list");
const verifyROLES = require("../../middleware/verifyROLES");


router
  .route("/")
  .get(verifyROLES(roles_list.user, roles_list.editor), getAllEmployees)
  .post(verifyROLES(roles_list.admin, roles_list.editor), createEmployee)
  .put(verifyROLES(roles_list.admin, roles_list.editor), updateEmployee)
  .delete(verifyROLES(roles_list.admin, roles_list.editor), deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
