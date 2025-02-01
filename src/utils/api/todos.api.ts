import { Todo } from "../types/todo.types";
import apiClient from "./client";

export const todosApi = {
  // Get all todos
  getAll: async () => {
    const response = await apiClient.get<Todo[]>("/todos");
    return response.data;
  },

  // Get single todo
  getById: async (id: string) => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create todo
  create: async (todo: Omit<Todo, "id" | "createdAt" | "updatedAt">) => {
    const response = await apiClient.post<Todo>("/todos", todo);
    return response.data;
  },

  // Update todo
  update: async (id: string, updates: Partial<Todo>) => {
    const response = await apiClient.patch<Todo>(`/todos/${id}`, updates);
    return response.data;
  },

  // Delete todo
  delete: async (id: string) => {
    await apiClient.delete(`/todos/${id}`);
  },

  // Toggle todo completion
  toggleComplete: async (id: string, completed: boolean) => {
    const response = await apiClient.patch<Todo>(`/todos/${id}/complete`, {
      completed,
    });
    return response.data;
  },
};
