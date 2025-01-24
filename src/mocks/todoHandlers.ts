import { http, HttpResponse } from 'msw';
import { todosCollection } from '../db/database';

export const todoHandlers = [
  // Get all todos
  http.get('/api/todos', async () => {
    const todos = await (await todosCollection).todos.find().exec();
    return HttpResponse.json(todos);
  }),

  // Get single todo
  http.get('/api/todos/:id', async ({ params }) => {
    const { id } = params;
    const todo = await (
      await todosCollection
    ).todos
      .findOne({
        selector: { id: id as string },
      })
      .exec();

    if (!todo) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(todo);
  }),

  // Create todo
  http.post('/api/todos', async ({ request }) => {
    const todo = await request.json();
    await (await todosCollection).todos.insert(todo);
    return HttpResponse.json(todo, { status: 201 });
  }),

  // Update todo
  http.patch('/api/todos/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();

    const todo = await (
      await todosCollection
    ).todos
      .findOne({
        selector: { id: id as string },
      })
      .exec();

    if (!todo) {
      return new HttpResponse(null, { status: 404 });
    }

    await todo.patch(updates);
    return HttpResponse.json(todo);
  }),

  // Delete todo
  http.delete('/api/todos/:id', async ({ params }) => {
    const { id } = params;
    const todo = await (
      await todosCollection
    ).todos
      .findOne({
        selector: { id: id as string },
      })
      .exec();

    if (!todo) {
      return new HttpResponse(null, { status: 404 });
    }

    await todo.remove();
    return new HttpResponse(null, { status: 204 });
  }),
];
