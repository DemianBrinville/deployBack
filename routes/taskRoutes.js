const { Router } = require("express");
const { expressjwt } = require("express-jwt");
const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require("../controllers/taskController");

const router = Router();

const verifyToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);
router.post("/", verifyToken, create);
router.delete("/:id", verifyToken, remove);
router.patch("/:id", verifyToken, update);

module.exports = router;
