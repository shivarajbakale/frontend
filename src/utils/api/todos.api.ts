import apiClient from "./client";
import { TodoType } from "../types/todo.types";

export const createTodo = async (todo: TodoType) => {
  const response = await apiClient.post("/todos", todo);
  return response.data;
};

export const getTodos = async () => {
  const response = await apiClient.get("/todos");
  return response.data;
};

export const updateTodo = async (todo: TodoType) => {
  const response = await apiClient.put(`/todos/${todo.id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await apiClient.delete(`/todos/${id}`);
  return response.data;
};
