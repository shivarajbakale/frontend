import { http, HttpResponse } from "msw";
import axios from "axios";
import { User } from "../utils/types/user.types";
import { jsonServerClient } from "./client";

// Request body types
interface CreateUserRequest
  extends Omit<User, "id" | "createdAt" | "updatedAt"> {}
interface UpdateUserRequest
  extends Partial<Omit<User, "createdAt" | "updatedAt">> {}

export const userHandlers = [
  // Get all users
  http.get("/api/users", async () => {
    try {
      const response = await jsonServerClient.get("/users");
      return HttpResponse.json(response.data);
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Get single user
  http.get("/api/users/:id", async ({ params }) => {
    try {
      const { id } = params;
      const response = await jsonServerClient.get(`/users/${id}`);
      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Create user
  http.post("/api/users", async ({ request }) => {
    try {
      const userData = (await request.json()) as CreateUserRequest;
      const newUser = {
        ...userData,
        fullName: `${userData.firstName} ${userData.lastName}`,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const response = await jsonServerClient.post("/users", newUser);
      return HttpResponse.json(response.data, { status: 201 });
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Update user
  http.patch("/api/users/:id", async ({ params, request }) => {
    try {
      const { id } = params;
      const updates = (await request.json()) as UpdateUserRequest;

      // If name is updated, update fullName
      const updatedUser = {
        ...updates,
        ...(updates.firstName || updates.lastName
          ? {
              fullName: `${
                updates.firstName ??
                (await jsonServerClient.get(`/users/${id}`)).data.firstName
              } ${
                updates.lastName ??
                (await jsonServerClient.get(`/users/${id}`)).data.lastName
              }`,
            }
          : {}),
        updatedAt: new Date().toISOString(),
      };

      const response = await jsonServerClient.patch(
        `/users/${id}`,
        updatedUser,
      );
      return HttpResponse.json(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // Delete user
  http.delete("/api/users/:id", async ({ params }) => {
    try {
      const { id } = params;
      await jsonServerClient.delete(`/users/${id}`);
      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return new HttpResponse(null, { status: 404 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
