import { Component, ReactNode } from "react";
import { Container, Paper, Title, Text, Button, Stack } from "@mantine/core";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public resetError = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container size="sm" py="xl">
          <Paper p="xl" radius="md" withBorder>
            <Stack align="center" gap="md">
              <Title order={2}>Something went wrong</Title>
              <Text c="red">
                {this.state.error?.message || "An unexpected error occurred"}
              </Text>
              <Button onClick={this.resetError}>Try Again</Button>
            </Stack>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}
