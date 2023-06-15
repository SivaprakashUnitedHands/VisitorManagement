const express = require('express');
const router = express.Router();
const VisitorService = require('../services/visitorService');

router.post("/api/createVisitor",VisitorService.createVisitor);
router.get("/api/getAllVisitor",VisitorService.getAllVisitor);
router.get("/api/getVisitorById/:_id",VisitorService.getVisitorById);
router.put("/api/updateVisitor/:_id",VisitorService.updateVisitor);
router.delete("/api/deleteVisitor/:_id",VisitorService.deleteVisitor);

module.exports = router;