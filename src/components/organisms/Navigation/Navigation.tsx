import { AppShell, Group, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Title order={3}>Todo App</Title>
        <Group gap="lg">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Link
            to="/todos"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Todos
          </Link>
          <Link
            to="/todos/new"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            New Todo
          </Link>
        </Group>
      </Group>
    </AppShell.Header>
  );
};
