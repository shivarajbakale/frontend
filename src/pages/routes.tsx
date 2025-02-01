import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { ErrorBoundary } from "../components/organisms/ErrorBoundary/ErrorBoundary";

// Lazy load all pages
const HomePage = lazy(() => import("./Home.page"));
const ListTodoPage = lazy(() => import("./ListTodo.page"));
const CreateTodoPage = lazy(() => import("./CreateTodo.page"));
const UpdateTodo = lazy(
  () => import("../components/organisms/forms/UpdateTodo"),
);
const PaymentPage = lazy(() => import("./Payment.page"));
const PaymentConfirmationPage = lazy(
  () => import("./PaymentConfirmation.page"),
);

export function Router() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingOverlay visible />}>
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
      </Suspense>
    </ErrorBoundary>
  );
}
