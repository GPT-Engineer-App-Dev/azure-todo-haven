import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Moon, Sun, Trash2 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { theme, setTheme } = useTheme();

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-blue-900">
      <header className="bg-blue-600 dark:bg-blue-800 p-4 flex justify-between items-center">
        <div className="w-10"></div>
        <h1 className="text-2xl font-bold text-white">Blue Todo App</h1>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-white" />}
        </Button>
      </header>

      <main className="flex-grow flex justify-center items-start pt-10">
        <Card className="w-full max-w-md p-6 bg-blue-100 dark:bg-blue-800">
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center space-x-2 bg-white dark:bg-blue-700 p-2 rounded"
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <span className={`flex-grow ${todo.completed ? "line-through" : ""}`}>
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </main>

      <footer className="bg-blue-600 dark:bg-blue-800 p-4 text-center text-white">
        © 2023 Blue Todo App
      </footer>
    </div>
  );
};

export default Index;