import { toTypedRxJsonSchema } from 'rxdb';

// Define the interface for our data
export interface TodoDocType {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

// Define the schema
export const todoSchemaLiteral = {
  title: 'todo schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    completed: {
      type: 'boolean',
    },
    createdAt: {
      type: 'number',
    },
  },
  required: ['id', 'title', 'createdAt'],
} as const;

export const userSchemaLiteral = {
  title: 'user schema',
  version: 0,
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
  },
  required: ['id', 'name'],
} as const;

export const todoSchema = toTypedRxJsonSchema(todoSchemaLiteral);
export const userSchema = toTypedRxJsonSchema(userSchemaLiteral);
export type TodoSchema = typeof todoSchema;
export type UserSchema = typeof userSchema;
