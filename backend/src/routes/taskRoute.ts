import { Router } from "express";
import { getFieldByValue, getFields, addTask, updateTask } from "../controllers/taskController";

const router = Router()

router.get("/fields", getFields)
router.get("/fields/:value", getFieldByValue)

router.post("/fields/:value", addTask)
router.put("/fields/:value", updateTask)

export default router