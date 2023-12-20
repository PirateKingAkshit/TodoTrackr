import TodoList from "../models/todoListModel.js";
import asyncHandler from "express-async-handler";

export const todoList = asyncHandler(async (req, res) => {
  const {id} = req.params;

  const userTodoList = await TodoList.find({ user: id });

  res.status(200).json({
    todoList: userTodoList,
  });
});



export const addTodo = asyncHandler(async (req, res) => {
  const { content, myList } = req.body;
  const userId = req.user._id;

  const newTodo = await TodoList.create({
    user: userId,
    myList,
    content,
  });

  res.status(201).json({ todo: newTodo });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const { todoListId, content } = req.body;

  const updatedTodo = await TodoList.findByIdAndUpdate(
    todoListId,
    {
      content
    },
    {
      new: true,
    }
  );

  if (updatedTodo) {
    res.status(200).json({ updatedTodo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

export const removeTodo = asyncHandler(async (req, res) => {
  const { todoListId } = req.body;

  const deletedTodo = await TodoList.findByIdAndDelete(todoListId);

  if (deletedTodo) {
    res.status(200).json({ message: "Item Deleted" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

export const moveToTrash = asyncHandler(async (req, res) => {
  const { todoListId } = req.body;

  const updatedTodo = await TodoList.findByIdAndUpdate(
    todoListId,
    {
      isTrash: true,
    },
    {
      new: true,
    }
  );

  if (updatedTodo) {
    res.status(200).json({ message: "Moved to trash" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});
