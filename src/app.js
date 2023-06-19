import express from "express";
import ProductManager from "./managers/product.manager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./products.json");

app.get("/products", async (req, res) => {
    try {
      const { limit } = req.query;
      const products = await productManager.getProducts();
  
      if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.get("/products/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(pid);
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.listen(8080, () => {
    console.log("Server listening on port 8080");
  });