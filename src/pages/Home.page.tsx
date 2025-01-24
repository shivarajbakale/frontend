import {
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDatabase } from '../db/DatabaseProvider';

export function HomePage() {
  const db = useDatabase();
  const queryClient = useQueryClient();
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // Fetch todos from RxDB
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      // First try to get from local DB
      const localTodos = await db.todos.find().exec();

      if (localTodos.length === 0) {
        // If empty, fetch from API and store in RxDB
        const response = await fetch('/api/todos');
        const apiTodos = await response.json();

        // Insert into RxDB
        await Promise.all(apiTodos.map((todo: any) => db.todos.insert(todo)));

        return apiTodos;
      }

      return localTodos.map((doc) => doc.toJSON());
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: async (title: string) => {
      const newTodo = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: Date.now(),
      };

      // Save to API
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      });

      // Save to RxDB
      await db.todos.insert(newTodo);

      return newTodo;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <Stack>
        <Title>Todos</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodoMutation.mutate(newTodoTitle);
          }}
        >
          <TextInput
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add new todo"
          />
          <Button type="submit">Add Todo</Button>
        </form>

        {todos?.map((todo: any) => <Text key={todo.id}>{todo.title}</Text>)}
      </Stack>
    </Container>
  );
}
