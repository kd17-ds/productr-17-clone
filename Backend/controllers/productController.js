const Product = require("../models/ProductModel");
const cloudinary = require("../utils/cloudinary");

module.exports.addProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      stock,
      mrp,
      sellingPrice,
      brandName,
      isExchangeReturnEligible,
    } = req.body;

    if (
      !name ||
      !type ||
      stock === undefined ||
      mrp === undefined ||
      sellingPrice === undefined ||
      !brandName
    ) {
      return res.status(400).json({
        ok: false,
        message: "All required fields must be provided",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        message: "Product image is required",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    const product = await Product.create({
      name,
      type,
      stock,
      mrp,
      sellingPrice,
      brandName,
      isExchangeReturnEligible,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      createdBy: req.userId,
    });

    return res.status(201).json({
      ok: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (err) {
    console.error("Add product error:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to add product",
    });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    const filter = { createdBy: req.userId };

    if (req.query.published !== undefined) {
      filter.isPublished = req.query.published === "true";
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return res.json({
      ok: true,
      data: products,
    });
  } catch (err) {
    console.error("Get products error:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to fetch products",
    });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Product not found",
      });
    }

    return res.json({
      ok: true,
      data: product,
    });
  } catch (err) {
    console.error("Get product by id error:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to fetch product",
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Product not found",
      });
    }

    [
      "name",
      "type",
      "stock",
      "mrp",
      "sellingPrice",
      "brandName",
      "isExchangeReturnEligible",
    ].forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    if (req.file) {
      await cloudinary.uploader.destroy(product.image.public_id);

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      product.image = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    }

    await product.save();

    res.json({
      ok: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({
      ok: false,
      message: "Failed to update product",
    });
  }
};

module.exports.togglePublishProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Product not found",
      });
    }

    product.isPublished = !product.isPublished;
    await product.save();

    return res.json({
      ok: true,
      message: `Product ${
        product.isPublished ? "published" : "unpublished"
      } successfully`,
      data: product,
    });
  } catch (err) {
    console.error("Toggle publish error:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to update publish status",
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!product) {
      return res.status(404).json({
        ok: false,
        message: "Product not found",
      });
    }

    await cloudinary.uploader.destroy(product.image.public_id);
    await product.deleteOne();

    return res.json({
      ok: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({
      ok: false,
      message: "Failed to delete product",
    });
  }
};
