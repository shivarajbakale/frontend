import { useMutation, useQuery } from "@tanstack/react-query";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../api/todos.api";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateTodo = () => {
  return useMutation({
    mutationFn: createTodo,
  });
};

export const useUpdateTodo = () => {
  return useMutation({
    mutationFn: updateTodo,
  });
};

export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: deleteTodo,
  });
};
