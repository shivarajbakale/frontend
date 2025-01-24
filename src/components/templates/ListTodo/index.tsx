import { Button, Table } from "@mantine/core";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const ListTodo = ({
  todos,
  onDelete,
  onEdit,
}: {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
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
              <Button
                size="xs"
                variant="subtle"
                onClick={() => onEdit(todo.id)}
              >
                Edit
              </Button>
              <Button
                size="xs"
                color="red"
                variant="subtle"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default ListTodo;
