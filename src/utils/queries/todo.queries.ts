import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "../api/todos.api";
import { Todo } from "../types/todo.types";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: todosApi.create,
  });
};

export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
      todosApi.update(id, updates),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todosApi.delete,
    onSuccess: (_, id) => {
      // Get the current todos from cache
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      if (previousTodos) {
        // Update cache by filtering out the deleted todo
        queryClient.setQueryData(
          ["todos"],
          previousTodos.filter((todo) => todo.id !== id),
        );
      }
    },
  });
};

export const useToggleTodoComplete = () => {
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todosApi.toggleComplete(id, completed),
  });
};
