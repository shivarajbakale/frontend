import type { Meta, StoryObj } from "@storybook/react";
import CreateTodo from "./index";

const meta = {
  title: "Forms/CreateTodo",
  component: CreateTodo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreateTodo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CreateTodo />,
};
