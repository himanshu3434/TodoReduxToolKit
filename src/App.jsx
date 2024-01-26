import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { store1 } from "./App/store";
import { addTodo, populateTodos } from "./features/todo/todoSlice";
import { TodoForm, TodoItem } from "./Components/index";
function App() {
  const todosList = useSelector((state) => state.todos);
  const dispatcher = useDispatch();
  useEffect(() => {
    const todoArray = JSON.parse(localStorage.getItem("todos"));
    console.log(todoArray, "todo array");
    if (todoArray && todoArray.length > 0) {
      dispatcher(populateTodos(todoArray));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosList));
  }, [todosList]);

  return (
    <>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{<TodoForm />}</div>
          <div className="flex flex-wrap gap-y-3">
            {
              /*Loop and Add TodoItem here */

              todosList.map((currentTodo) => (
                <div key={currentTodo.id} className="w-full">
                  <TodoItem todo={currentTodo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
