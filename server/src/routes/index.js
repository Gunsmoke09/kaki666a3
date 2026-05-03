const express = require("express");

const AuthenticationRouter = require("./auth");
const TutorialRouter = require("./tutorial");
const CategoryRouter = require("./category");
const MaterialRouter = require("./material");

const router = express.Router();

router.use('/auth', AuthenticationRouter);
router.use('/tutorials', TutorialRouter);
router.use('/categories', CategoryRouter);
router.use('/materials', MaterialRouter);

module.exports = router;