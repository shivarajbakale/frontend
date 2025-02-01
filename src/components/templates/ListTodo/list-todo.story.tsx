import type { Meta, StoryObj } from "@storybook/react";
import ListTodo from "./index";

const meta = {
  title: "Organisms/ListTodo",
  component: ListTodo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todos: [
      {
        id: "1",
        title: "Learn React",
        description: "Learn React fundamentals",
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Learn TypeScript",
        description: "Learn TypeScript basics",
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Build a project",
        description: "Build a full-stack project",
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    onDelete: (id) => {
      console.log("delete", id);
    },
    onEdit: (id) => {
      console.log("edit", id);
    },
    onToggleComplete: (id) => {
      console.log("toggle complete", id);
    },
  },
  render: (args) => <ListTodo {...args} />,
};
