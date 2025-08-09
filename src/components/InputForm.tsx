import PlusIcon from "./icons/PlusIcon";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodos } from "../hooks/useHooks";

const todoSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(3, "Please enter at least 3 characters"),
  createdAt: z.date().optional(),
  isCompleted: z.boolean().optional(),
});

type TodoType = z.infer<typeof todoSchema>;

export default function InputForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoType>({
    resolver: zodResolver(todoSchema),
  });

  const { addTodo } = useTodos();

  const onSubmit: SubmitHandler<TodoType> = (data) => {
    const newTodo = {
      id: crypto.randomUUID(),
      content: data.content,
      createdAt: new Date().toISOString(),
      isCompleted: false,
    };

    addTodo(newTodo);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        {...register("content")}
        onFocus={() => {
          if (errors.content) {
            reset({ content: "" }, { keepValues: true });
          }
        }}
        type="text"
        autoComplete="off"
        placeholder="Create a new todo"
        className="p-4 lg:p-5 w-full container rounded-sm px-10 outline-none"
      ></input>

      <button className="absolute top-1/2 cursor-pointer -translate-y-1/2 flex w-fit right-5">
        <PlusIcon />
      </button>
      {errors.content && (
        <p className="absolute top-full text-sm text-red-500 mt-1">
          {errors.content.message}
        </p>
      )}
    </form>
  );
}
