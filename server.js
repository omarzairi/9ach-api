import express from "express";
import fetch from "node-fetch";
import connectDB from "./config/MongoDB.js";
import getProds from "./data/products.js";
import ImportData from "./DataImport.js";
import Product from "./Models/ProductModel.js";
import productRoute from "./Routes/ProductRoutes.js";
import userRoute from "./Routes/UserRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

connectDB();
// getProds();
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.get("/", (req, res) => {
  res.send("api running");
});
app.listen(5000, console.log("app running...."));
