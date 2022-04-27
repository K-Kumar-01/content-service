const {
  createContentMany,
  createContentOne,
  fetchAllContent,
  fetchContentForUser,
} = require("../controllers/series");

const { Router } = require("express");
const router = Router();

router.get("/all", fetchAllContent);
router.post("/create/one", createContentOne);
router.post("/create/many", createContentMany);
router.get("/:id", fetchContentForUser);

module.exports = router;
