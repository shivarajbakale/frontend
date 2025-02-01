import ListTodo from "@/components/templates/ListTodo";
import {
  useTodos,
  useDeleteTodo,
  useUpdateTodo,
} from "@/utils/queries/todo.queries";
import { Container, Title, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const ListTodoPage = () => {
  const { data: todos } = useTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

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

  const handleEdit = async (id: string) => {
    try {
      await updateTodo({ id, updates: { completed: true } });
      notifications.show({
        title: "Success",
        message: "Todo updated successfully",
        color: "green",
      });
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
        />
      </Stack>
    </Container>
  );
};

export default ListTodoPage;
