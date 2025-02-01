import { http, HttpResponse } from "msw";
import axios from "axios";
import { Todo } from "../utils/types/todo.types";
import { jsonServerClient } from "./client";

// Request body types
interface CreateTodoRequest
  extends Omit<Todo, "id" | "createdAt" | "updatedAt"> {}
interface UpdateTodoRequest extends Partial<Todo> {}
interface ToggleCompletionRequest {
  completed: boolean;
}
interface UpdatePriorityRequest {
  priority: "low" | "medium" | "high";
}
interface AddTagRequest {
  tag: string;
}

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

  // Get todos by user ID
  http.get("/api/todos/user/:userId", async ({ params }) => {
    try {
      const { userId } = params;
      const response = await jsonServerClient.get(`/todos?userId=${userId}`);
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
      const todo = (await request.json()) as CreateTodoRequest;
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
      const updates = (await request.json()) as UpdateTodoRequest;
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

  // Toggle todo completion
  http.patch("/api/todos/:id/complete", async ({ params, request }) => {
    try {
      const { id } = params;
      const { completed } = (await request.json()) as ToggleCompletionRequest;
      const response = await jsonServerClient.patch(`/todos/${id}`, {
        completed,
        updatedAt: new Date().toISOString(),
      });
      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Update todo priority
  http.patch("/api/todos/:id/priority", async ({ params, request }) => {
    try {
      const { id } = params;
      const { priority } = (await request.json()) as UpdatePriorityRequest;
      const response = await jsonServerClient.patch(`/todos/${id}`, {
        priority,
        updatedAt: new Date().toISOString(),
      });
      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Add tag to todo
  http.post("/api/todos/:id/tags", async ({ params, request }) => {
    try {
      const { id } = params;
      const { tag } = (await request.json()) as AddTagRequest;

      // Get current todo
      const todoResponse = await jsonServerClient.get(`/todos/${id}`);
      const todo = todoResponse.data as Todo;

      // Add new tag
      const tags = new Set([...todo.tags, tag]);

      // Update todo
      const response = await jsonServerClient.patch(`/todos/${id}`, {
        tags: Array.from(tags),
        updatedAt: new Date().toISOString(),
      });

      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Remove tag from todo
  http.delete("/api/todos/:id/tags/:tag", async ({ params }) => {
    try {
      const { id, tag } = params;

      // Get current todo
      const todoResponse = await jsonServerClient.get(`/todos/${id}`);
      const todo = todoResponse.data as Todo;

      // Remove tag
      const tags = todo.tags.filter((t) => t !== tag);

      // Update todo
      const response = await jsonServerClient.patch(`/todos/${id}`, {
        tags,
        updatedAt: new Date().toISOString(),
      });

      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
