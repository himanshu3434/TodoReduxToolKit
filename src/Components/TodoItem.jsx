import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  toggleComplete,
  updateTodo,
} from "../features/todo/todoSlice";
function TodoItem({ todo }) {
  const [newMessage, setNewMessage] = useState(todo.text);
  const dispatcher = useDispatch();
  //   const todos = useSelector((state) => state.todos);
  const todoid = todo.id;
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const toggleCompleted = () => {
    dispatcher(toggleComplete(todoid));
  };
  const editTodo = () => {
    dispatcher(updateTodo({ newMessage, todoid }));
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => dispatcher(deleteTodo(todoid))}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
