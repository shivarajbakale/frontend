import { Anchor, Button, Container, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router';
import classes from './Welcome.module.css';

export function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn
        more on Mantine + Vite integration follow{' '}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>
      <Container>
        <Button onClick={() => navigate('/homepage')}>Go to Homepage</Button>
      </Container>
    </>
  );
}
