const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

const {
  addProduct,
  updateProduct,
  deleteProduct,
  togglePublishProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController.js");

router.post("/add", authMiddleware, upload.single("image"), addProduct);
router.get("/all", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, upload.single("image"), updateProduct);
router.patch("/:id/publish", authMiddleware, togglePublishProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
