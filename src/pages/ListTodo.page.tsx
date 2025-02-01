import ListTodo from "@/components/templates/ListTodo";
import {
  useTodos,
  useDeleteTodo,
  useUpdateTodo,
} from "@/utils/queries/todo.queries";
import {
  Container,
  Title,
  Stack,
  Modal,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Todo } from "@/utils/types/todo.types";

const ListTodoPage = () => {
  const { data: todos } = useTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "Title is required" : null),
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id, {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Todo deleted successfully",
            color: "green",
          });
        },
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete todo",
        color: "red",
      });
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    form.setValues({
      title: todo.title,
      description: todo.description,
    });
  };

  const handleSubmitEdit = async (values: {
    title: string;
    description: string;
  }) => {
    if (!editingTodo) {
      return;
    }

    try {
      await updateTodo(
        {
          id: editingTodo.id,
          updates: {
            title: values.title,
            description: values.description,
          },
        },
        {
          onSuccess: () => {
            notifications.show({
              title: "Success",
              message: "Todo updated successfully",
              color: "green",
            });
            setEditingTodo(null);
            form.reset();
          },
        },
      );
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update todo",
        color: "red",
      });
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      await updateTodo(
        {
          id: todo.id,
          updates: { completed: !todo.completed },
        },
        {
          onSuccess: () => {
            notifications.show({
              title: "Success",
              message: `Todo marked as ${!todo.completed ? "completed" : "incomplete"}`,
              color: "green",
            });
          },
        },
      );
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update todo",
        color: "red",
      });
    }
  };

  return (
    <Container>
      <Stack gap="md">
        <Title>Your Todos</Title>
        <ListTodo
          todos={todos || []}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggleComplete={handleToggleComplete}
        />
      </Stack>

      <Modal
        opened={!!editingTodo}
        onClose={() => {
          setEditingTodo(null);
          form.reset();
        }}
        title="Edit Todo"
      >
        <form onSubmit={form.onSubmit(handleSubmitEdit)}>
          <Stack>
            <TextInput
              label="Title"
              placeholder="Enter todo title"
              required
              {...form.getInputProps("title")}
            />
            <Textarea
              label="Description"
              placeholder="Enter todo description"
              {...form.getInputProps("description")}
            />
            <Button type="submit">Save Changes</Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default ListTodoPage;
