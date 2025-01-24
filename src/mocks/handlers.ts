import { todosCollection, usersCollection } from '@/db/database';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/todos', async () => {
    const todos = await (await todosCollection).todos.find().exec();
    return HttpResponse.json(todos);
  }),

  http.get('/api/users', async () => {
    const users = await (await usersCollection).users.find().exec();
    return HttpResponse.json(users);
  }),

  http.post('/api/todos', async ({ request }) => {
    const todo = await request.json();
    (await todosCollection).todos.insert(todo);
    return HttpResponse.json(todo, { status: 201 });
  }),

  http.post('/api/users', async ({ request }) => {
    const user = await request.json();
    (await usersCollection).users.insert(user);
    return HttpResponse.json(user, { status: 201 });
  }),
];
