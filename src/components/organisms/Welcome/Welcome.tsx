import { Anchor, Button, Container, Text, Title } from "@mantine/core";
import classes from "./Welcome.module.css";
import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn
        more on Mantine + Vite integration follow{" "}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>
      <Container className="flex justify-center gap-4 mt-4">
        <Button component={Link} to="/todo/create">
          Create Todo
        </Button>
        <Button component={Link} to="/todo/list">
          List Todo
        </Button>
      </Container>
    </>
  );
}
