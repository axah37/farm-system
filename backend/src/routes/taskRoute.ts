import { Router } from "express";
import { getFieldByValue, getFields, addTask } from "../controllers/taskController";

const router = Router()

router.get("/fields", getFields)
router.get("/fields/:value", getFieldByValue)

router.post("/fields/:value", addTask)

export default router