import { Router } from "express";
import { getFieldByValue, getFields, addTask, updateTask, deleteTask } from "../controllers/taskController";

const router = Router()

router.get("/fields", getFields)
router.get("/fields/:value", getFieldByValue)

router.post("/fields/:value", addTask)
router.put("/fields/:value", updateTask)
router.delete("/fields/:value/task/:taskId", deleteTask)

export default router