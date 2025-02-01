import { Container, Title, Text, Stack } from "@mantine/core";

export const HomePage = () => {
  return (
    <Container>
      <Stack gap="md">
        <Title>Welcome to Todo App</Title>
        <Text>
          This is a simple todo application built with React, TypeScript, and
          Mantine UI. You can create, read, update, and delete todos.
        </Text>
      </Stack>
    </Container>
  );
};

export default HomePage;
