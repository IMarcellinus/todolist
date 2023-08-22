import React, { useState, useEffect } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

export const Todolist: React.FC = () => {
  const saveTodosToLocalStorage = (todos: object) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const [todos, setTodos] = useState<item[]>([
    { id: 1, text: "Marcellinus", completed: false },
    { id: 2, text: "Marcellinus2", completed: false },
  ]);
  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    console.log("Adding new todo:", input); // Cek apakah nilai input sudah sesuai
    const newTodo: item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput(""); // Setelah menambahkan, reset nilai input ke string kosong
  };

  // Mengambil data todos dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Menyimpan data todos ke localStorage setiap kali terjadi perubahan pada state todos
  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative p-8 space-y-2 bg-white shadow-2xl rounded-2xl">
        <h1 className="text-2xl">Todo List by Marcellinus</h1>
        <div className="flex items-center" id="new-task-form">
          <div className="relative w-full">
            <input
              type="text"
              id="new-task-title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Add To do list"
              onChange={(e) => setInput(e.currentTarget.value)}
              value={input}
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleClick}
          >
            Add
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
