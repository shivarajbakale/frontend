import { http, HttpResponse } from 'msw';
import { usersCollection } from '../db/database';

export const userHandlers = [
  // Get all users
  http.get('/api/users', async () => {
    const users = await (await usersCollection).users.find().exec();
    return HttpResponse.json(users);
  }),

  // Get single user
  http.get('/api/users/:id', async ({ params }) => {
    const { id } = params;
    const user = await (
      await usersCollection
    ).users
      .findOne({
        selector: { id: id as string },
      })
      .exec();

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(user);
  }),

  // Create user
  http.post('/api/users', async ({ request }) => {
    const user = await request.json();
    await (await usersCollection).users.insert(user);
    return HttpResponse.json(user, { status: 201 });
  }),

  // Update user
  http.patch('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json();

    const user = await (
      await usersCollection
    ).users
      .findOne({
        selector: { id: id as string },
      })
      .exec();

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    await user.patch(updates);
    return HttpResponse.json(user);
  }),

  // Delete user
  http.delete('/api/users/:id', async ({ params }) => {
    const { id } = params;
    const user = await (
      await usersCollection
    ).users
      .findOne({
        selector: { id: id as string },
      })
      .exec();

    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }

    await user.remove();
    return new HttpResponse(null, { status: 204 });
  }),
];
