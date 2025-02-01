import "@mantine/core/styles.css";
import { MantineProvider, AppShell } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/organisms/Navigation";
import ListTodoPage from "./pages/ListTodo.page";
import CreateTodoPage from "./pages/CreateTodo.page";
import HomePage from "./pages/Home.page";

import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { clarity } from "react-microsoft-clarity";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  useEffect(() => {
    clarity.init(import.meta.env.VITE_CLARITY_ID);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MantineProvider theme={theme}>
          <Notifications />
          <AppShell header={{ height: 60 }} padding="md">
            <Navigation />
            <AppShell.Main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/todos" element={<ListTodoPage />} />
                <Route path="/todos/new" element={<CreateTodoPage />} />
              </Routes>
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
