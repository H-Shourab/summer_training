// Packages
const express = require("express");

// Callings
const router = express.Router();

// Controllers
const Admin_Controller = require("../controllers/user");

// Middlewares
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

// Routes
router.post("/signup", Admin_Controller.Signup)
router.post("/login", Admin_Controller.Login)
router.delete("/delete/:_id", Admin_Controller.DeleteAdmin)
// Export
module.exports = router;