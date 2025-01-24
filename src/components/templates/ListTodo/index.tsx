import { Table } from "@mantine/core";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const ListTodo = ({ todos }: { todos: Todo[] }) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Completed</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {todos.map((todo) => (
          <Table.Tr key={todo.id}>
            <Table.Td>{todo.title}</Table.Td>
            <Table.Td>{todo.description}</Table.Td>
            <Table.Td>{todo.completed ? "Yes" : "No"}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default ListTodo;
