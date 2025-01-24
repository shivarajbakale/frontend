import { Container, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

export function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const response = await fetch('/api/hello');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Container>
      <Title>Home Page</Title>
      <Text>{data?.message}</Text>
    </Container>
  );
}
