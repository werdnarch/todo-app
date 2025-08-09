import { createFileRoute } from "@tanstack/react-router";
import ThemeProvider from "../components/ThemeProvider";
import InputForm from "../components/InputForm";
import TodoDisplay from "../components/TodoDisplay";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-full w-full flex justify-center p-4 md:p-8 lg:p-[8rem]">
      <section className="w-full max-w-[700px] flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <h1 className="font-bold text-3xl lg:text-4xl text-white uppercase tracking-[0.5rem]">
            TODO
          </h1>
          <ThemeProvider />
        </header>

        <InputForm />

        <TodoDisplay />
      </section>
    </main>
  );
}
