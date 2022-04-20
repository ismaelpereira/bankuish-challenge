const { Router } = require("express");
const userRoutes = require("./user");
const courseRoutes = require("./courses");

const router = Router();

router.use("/user", userRoutes);
router.use("/course", courseRoutes);

module.exports = router;
