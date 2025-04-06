
const resumeController = require("../controllers/temp7Controller");

//console.log("temp7Controller:", temp7Controller);
console.log("resumeController:", resumeController);

const express = require("express");
const router = express.Router();

router.post("/create", resumeController.createResume);
router.post("/save", resumeController.saveResume);
router.post("/enhanceField", resumeController.enhanceField);
router.post("/generate-pdf", resumeController.generateAndDownloadPDF);
router.get("/load", resumeController.getResumeByEmail);

module.exports = router;
