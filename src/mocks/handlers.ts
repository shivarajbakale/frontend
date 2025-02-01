import { todoHandlers } from "./todoHandlers";
import { userHandlers } from "./userHandlers";

export const handlers = [
  ...todoHandlers,
  ...userHandlers,
  // Add other handlers here when needed (e.g., authHandlers, etc.)
];
