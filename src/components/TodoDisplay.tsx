import { useState } from "react";
import { useTodos } from "../hooks/useHooks";
import { type Todo } from "../types";
import CrossIcon from "./icons/CrossIcon";

export default function TodoDisplay() {
  const { todos, toggleTodoCheck, removeTodo, clearCompletedTodos } =
    useTodos();

  const [filterBy, setFilterBy] = useState<"all" | "active" | "completed">(
    "all"
  );

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="flex flex-col container w-full rounded-sm transition-all duration-300 ease-in-out">
      {[...todos]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .filter((todo) =>
          filterBy === "active"
            ? !todo.isCompleted
            : filterBy === "completed"
              ? todo.isCompleted
              : true
        )
        .map((todo: Todo, index: number) => (
          <div
            onMouseEnter={() => setHoveredId(todo.id)}
            onMouseLeave={() => setHoveredId(null)}
            key={todo.id}
            onClick={() => toggleTodoCheck(todo.id)}
            className={`p-4 flex items-center relative gap-4 ${index !== todos.length - 1 ? "border-b-1 border-zinc-200" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) => e.stopPropagation()}
            ></input>
            <p
              className={`relative ${todo.isCompleted ? "opacity-50" : "opacity-100"} transition-all duration-150 ease-in-out`}
            >
              {todo.content}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-zinc-400 ${todo.isCompleted ? "w-full" : "w-0"} transition-all duration-300 ease-in-out`}
              ></span>
            </p>

            <button
              onClick={() => removeTodo(todo.id)}
              className={`absolute hover:scale-95 transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 right-4 cursor-pointer ${hoveredId === todo.id ? "opacity-100" : "opacity-0"}`}
            >
              <CrossIcon />
            </button>
          </div>
        ))}

      {/*EMPTY TODO MESSAGE */}
      {todos.length <= 0 && (
        <div className=" text-center w-full p-8">
          <p className="text-lg">No todo items left!</p>
        </div>
      )}

      <footer className="border-t-1 w-full border-zinc-200 p-4 flex items-center justify-between">
        <p className="text-sm">
          {
            todos.filter((todo) =>
              filterBy === "active"
                ? !todo.isCompleted
                : filterBy === "completed"
                  ? todo.isCompleted
                  : true
            ).length
          }{" "}
          items left
        </p>

        <button
          className={` ${filterBy === "all" ? "text-blue-500" : "cursor-pointer"} transition-all duration-200 ease-in-out`}
          onClick={() => {
            setFilterBy("all");
          }}
        >
          <p className="font-semibold">All</p>
        </button>

        <button
          className={` ${filterBy === "active" ? "text-blue-500" : "cursor-pointer"} transition-all duration-200 ease-in-out`}
          onClick={() => setFilterBy("active")}
        >
          <p className="font-semibold">Active</p>
        </button>

        <button
          className={` ${filterBy === "completed" ? "text-blue-500" : "cursor-pointer"} transition-all duration-200 ease-in-out`}
          onClick={() => setFilterBy("completed")}
        >
          <p className="font-semibold">Completed</p>
        </button>

        <button onClick={clearCompletedTodos} className="cursor-pointer">
          <p className="text-sm">Clear Completed</p>
        </button>
      </footer>
    </section>
  );
}
