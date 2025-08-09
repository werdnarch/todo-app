import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TodoProvider } from "../providers/TodoProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <TodoProvider>
        <Outlet />
      </TodoProvider>
    </React.Fragment>
  );
}
