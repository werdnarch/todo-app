import { type ReactNode } from "react";
import { TodoContext } from "../context/TodoContext";
import { useDataStorage } from "../hooks/useDataStorage";

type Todo = {
  id: string;
  content: string;
  createdAt: string;
  isCompleted: boolean;
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useDataStorage<Todo[]>("todos", []);

  const addTodo = (newTodo: Todo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodoCheck = (id: string) => {
    if (!todos) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.isCompleted));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodoCheck,
        removeTodo,
        clearCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
