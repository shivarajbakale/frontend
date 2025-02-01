import { Route, Routes } from "react-router-dom";
import UpdateTodo from "../components/organisms/forms/UpdateTodo";
import ListTodoPage from "./ListTodo.page";
import { HomePage } from "./Home.page";
import CreateTodoPage from "./CreateTodo.page";
import { PaymentConfirmationPage } from "./PaymentConfirmation.page";
import { PaymentPage } from "./Payment.page";
import { ErrorBoundary } from "../components/organisms/ErrorBoundary/ErrorBoundary";

export function Router() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Todo Routes */}
        <Route path="/todos" element={<ListTodoPage />} />
        <Route path="/todos/new" element={<CreateTodoPage />} />
        <Route path="/todo/update/:id" element={<UpdateTodo />} />
        {/* Payment Routes */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/payment-confirmation"
          element={<PaymentConfirmationPage />}
        />
        {/* 404 Route */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </ErrorBoundary>
  );
}
