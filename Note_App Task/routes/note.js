// Packages
const express = require("express");

// Callings
const router = express.Router();

// Controllers
const Note_Controller = require("../controllers/note");

// Middlewares
const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

// Routes
router.post("/addnote",Note_Controller.addNode)
router.get("/allnotes",Note_Controller.findallNotes)
router.put("/editnote/:_id",Note_Controller.editNote)
router.delete("/deletenote/:_id",Note_Controller.deleteNote)
// Export
module.exports = router;