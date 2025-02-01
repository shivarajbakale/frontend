import { Route, Routes } from "react-router-dom";
import UpdateTodo from "../components/organisms/forms/UpdateTodo";
import { Welcome } from "../components/organisms/Welcome/Welcome";
import ListTodoPage from "./ListTodo.page";
import { HomePage } from "./Home.page";
import CreateTodoPage from "./CreateTodo.page";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/homepage" element={<HomePage />} />
      {/* Todo Create Route */}
      <Route path="/todo/create" element={<CreateTodoPage />} />
      {/* Todo Update Route */}
      <Route path="/todo/update/:id" element={<UpdateTodo />} />
      {/* Todo List Route */}
      <Route path="/todo/list" element={<ListTodoPage />} />
      {/* Need a 404 route here */}
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
