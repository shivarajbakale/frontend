import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { DatabaseProvider } from "./db/DatabaseProvider";
import { Router } from "./pages/routes";
import { theme } from "./theme";

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
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <DatabaseProvider>
        <BrowserRouter>
          <MantineProvider theme={theme}>
            <Router />
          </MantineProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </DatabaseProvider>
    </QueryClientProvider>
  );
}
