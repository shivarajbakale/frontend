import { http, HttpResponse } from "msw";
import axios from "axios";
import { jsonServerClient } from "./client";
import { Todo } from "@/utils/types/todo.types";

export const todoHandlers = [
  // Get all todos
  http.get("/api/todos", async () => {
    try {
      const response = await jsonServerClient.get("/todos");
      return HttpResponse.json(response.data);
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Get single todo
  http.get("/api/todos/:id", async ({ params }) => {
    try {
      const { id } = params;
      const response = await jsonServerClient.get(`/todos/${id}`);
      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Create todo
  http.post("/api/todos", async ({ request }) => {
    try {
      const todo = (await request.json()) as Todo;
      const newTodo = {
        ...todo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await jsonServerClient.post("/todos", newTodo);
      return HttpResponse.json(response.data, { status: 201 });
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Update todo
  http.patch("/api/todos/:id", async ({ params, request }) => {
    try {
      const { id } = params;
      const updates = (await request.json()) as Partial<Todo>;
      const updatedTodo = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      const response = await jsonServerClient.patch(
        `/todos/${id}`,
        updatedTodo,
      );
      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Delete todo
  http.delete("/api/todos/:id", async ({ params }) => {
    try {
      const { id } = params;
      await jsonServerClient.delete(`/todos/${id}`);
      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
