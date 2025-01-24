import type { Meta, StoryObj } from "@storybook/react";
import ListTodo from "./index";

const meta = {
  title: "Templates/ListTodo",
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
      },
      {
        id: "2",
        title: "Learn TypeScript",
        description: "Learn TypeScript basics",
        completed: true,
      },
      {
        id: "3",
        title: "Build a project",
        description: "Build a full-stack project",
        completed: false,
      },
    ],
  },
  render: (args) => <ListTodo {...args} />,
};
