import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routers/router.js";
import connectDb from "./config/db.js";
import cors from "cors";
import path from "path";

const port = process.env.PORT || 4000;
const app=express();
const __dirname = path.resolve();




app.use(cors());
app.use(express.json());
app.use("/pr",router);
app.use(express.static(path.join(__dirname,"../frontend1/@latest/dist/")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend1/@latest/dist/index.html"));
});


connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));