import { createContext } from "react";

type Todo = {
  id: string;
  content: string;
  createdAt: string;
  isCompleted: boolean;
};

export type TodoContextType = {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  toggleTodoCheck: (id: string) => void;
  removeTodo: (id: string) => void;
  clearCompletedTodos: () => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodoCheck: () => {},
  removeTodo: () => {},
  clearCompletedTodos: () => {},
});
