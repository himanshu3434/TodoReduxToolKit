import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};
//{ id: 1, text: "hello guys", completed: false }
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    populateTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };

      state.todos.push(todo);
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.todoid
          ? { ...todo, text: action.payload.newMessage }
          : todo
      );
    },
    toggleComplete: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleComplete,
  populateTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
