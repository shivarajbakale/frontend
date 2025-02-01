import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: todosApi.delete,
  });
};

export const useToggleTodoComplete = () => {
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todosApi.toggleComplete(id, completed),
  });
};
