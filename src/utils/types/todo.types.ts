export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  tags: string[];
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}
