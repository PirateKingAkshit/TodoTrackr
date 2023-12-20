import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTodos = (userId) => async (dispatch) => {
    try {
        dispatch(getTodosLoading())
        
        const { data } = await axios.get(`http://localhost:8000/api/todoList/${userId}`)

        dispatch(getTodosSuccess(data.todoList));
        
    }
    catch (error) {
        dispatch(getTodosFailure(error))
    }
}

export const addTodo = (content, myList,user) => async (dispatch) => {
        try {
            dispatch(addTodoLoading())
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.post(
              `http://localhost:8000/api/todoList/addTodo`,
              { content, myList },
              config
            );
            dispatch(addTodoSuccess(data.todo))
        }
        catch (error) {
            dispatch(addTodoFailure(error));
        }
};


export const updateTodo = (todoListId, content,user) => async (dispatch) => {
  try {
    dispatch(updateTodoLoading());
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/todoList/updateTodo`,
      { todoListId, content },
      config
    );
    dispatch(updateTodoSuccess(data.updatedTodo));
  } catch (error) {
    dispatch(updateTodoFailure(error));
  }
};


export const todosSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        isLoading:false,
        error: null
    },
    reducers: {
        getTodosLoading: (state) => {
            state.loading=true,
            state.error=null
        },
        getTodosSuccess: (state, action) => {
            state.loading = false,
            state.error=null,
            state.todos=action.payload
        },
        getTodosFailure: (state, action) => {
            state.loading = false,
            state.error=action.payload
        },
        addTodoLoading: (state) => {
            state.isLoading = true,
            state.error=null
        },
        addTodoSuccess: (state, action) => {
            state.isLoading = false,
            state.error=null,
            state.todos.unshift(action.payload)
        },
        addTodoFailure: (state,action) => {
            state.isLoading = false,
            state.error=action.payload
        },
        updateTodoLoading: (state) => {
            state.isLoading = true,
            state.error=null
        },
        updateTodoSuccess: (state, action) => {
            state.isLoading = false,
                state.error = null,
                state.todos = state.todos.map((todo) => {
                    if (todo._id === action.payload._id) {
                        return {...action.payload}
                    }
                    return todo
            })
        },
        updateTodoFailure: (state,action) => {
            state.isLoading = false,
            state.error=action.payload
        }
    }
})

export const { getTodosFailure,getTodosSuccess,getTodosLoading,addTodoFailure,addTodoLoading,addTodoSuccess,updateTodoFailure,updateTodoSuccess,updateTodoLoading } = todosSlice.actions;

export default todosSlice.reducer;

