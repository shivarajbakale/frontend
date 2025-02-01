import "@mantine/core/styles.css";
import { MantineProvider, AppShell } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./components/organisms/Navigation";
import { Router as AppRouter } from "./pages/routes";

import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { clarity } from "react-microsoft-clarity";

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            retryDelay: 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
          },
        },
      }),
  );

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
              <AppRouter />
            </AppShell.Main>
          </AppShell>
        </MantineProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
