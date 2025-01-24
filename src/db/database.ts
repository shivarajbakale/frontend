import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { todoSchema, userSchema } from './schema';

const appDatabase = await createRxDatabase({
  name: 'mydatabase',
  storage: wrappedValidateAjvStorage({
    storage: getRxStorageDexie(),
  }),
});

const todosCollection = appDatabase.addCollections({
  todos: {
    schema: todoSchema,
  },
});

const usersCollection = appDatabase.addCollections({
  users: {
    schema: userSchema,
  },
});

export { todosCollection, usersCollection };

export default appDatabase;
