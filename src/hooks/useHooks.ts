import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export function useTodos() {
  return useContext(TodoContext);
}
