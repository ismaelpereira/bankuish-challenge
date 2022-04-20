const { Router } = require("express");
const { default: userRoutes } = require("./routes/user");

const router = Router();

router.use("/user", userRoutes);
router.use("/course");

module.exports = router;
