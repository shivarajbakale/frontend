import { todoHandlers } from './todoHandlers';
import { userHandlers } from './userHandlers';

export const handlers = [...todoHandlers, ...userHandlers];
