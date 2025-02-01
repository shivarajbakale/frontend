import type { Meta, StoryObj } from "@storybook/react";
import TodoForm from "./index";

const meta = {
  title: "Forms/TodoForm",
  component: TodoForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TodoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Create: Story = {
  args: {
    submitLabel: "Create Todo",
    onSubmit: (values) => {
      console.log("Creating:", values);
    },
  },
};

export const Edit: Story = {
  args: {
    submitLabel: "Update Todo",
    initialData: {
      title: "Existing Todo",
      description: "This is an existing todo being edited",
    },
    onSubmit: (values) => {
      console.log("Updating:", values);
    },
  },
};
