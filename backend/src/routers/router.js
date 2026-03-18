import express from "express";
import {getAllPr,getOnePr,postPr,updatePr,deletePr} from "../routerControllers/controller.js"

const router = express.Router();

router.get("/", getAllPr);
router.get("/:id",getOnePr);
router.post("/",postPr);
router.put("/:id",updatePr);
router.delete("/:id",deletePr);


export default router;