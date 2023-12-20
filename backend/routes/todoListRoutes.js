import express from "express";
import { todoList, addTodo,updateTodo,removeTodo,moveToTrash } from "../controllers/todoListControllers.js";
const router = express.Router();
import authenticateUser from "../middleware/authenticateUser.js"

// Get User todo list
router.get("/:id", todoList);

//Adding todo 
router.post("/addTodo",authenticateUser,addTodo)

//Update todo list
router.put("/updateTodo", authenticateUser, updateTodo)

//Delete todo list
router.delete("/deleteTodo", authenticateUser, removeTodo);

//Move to trash
router.put("/trashTodo", authenticateUser, moveToTrash);

export default router;
