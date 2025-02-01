import { Button, Table, Group } from "@mantine/core";
import { Todo } from "@/utils/types/todo.types";

const ListTodo = ({
  todos,
  onDelete,
  onEdit,
  onToggleComplete,
}: {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onToggleComplete: (todo: Todo) => void;
}) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Completed</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {todos.map((todo) => (
          <Table.Tr key={todo.id}>
            <Table.Td>{todo.title}</Table.Td>
            <Table.Td>{todo.description}</Table.Td>
            <Table.Td>{todo.completed ? "Yes" : "No"}</Table.Td>
            <Table.Td>
              <Group gap="xs">
                <Button size="xs" variant="subtle" onClick={() => onEdit(todo)}>
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="subtle"
                  color={todo.completed ? "yellow" : "green"}
                  onClick={() => onToggleComplete(todo)}
                >
                  {todo.completed ? "Mark Incomplete" : "Complete"}
                </Button>
                <Button
                  size="xs"
                  color="red"
                  variant="subtle"
                  onClick={() => onDelete(todo.id)}
                >
                  Delete
                </Button>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default ListTodo;
