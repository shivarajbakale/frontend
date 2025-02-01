import { Container, Title } from "@mantine/core";
import CreateTodoForm from "@/components/organisms/forms/CreateTodo";
import { useNavigate } from "react-router-dom";
import { useCreateTodo, useTodos } from "@/utils/queries/todo.queries";

export const CreateTodoPage = () => {
  const { mutate: createTodo } = useCreateTodo();
  const { refetch: refetchTodos } = useTodos();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    await createTodo(values);
    await refetchTodos();
    navigate("/todos");
  };

  return (
    <Container>
      <Title order={2} className="text-center">
        Create New Todo
      </Title>
      <Container>
        <CreateTodoForm onSubmit={handleSubmit} />
      </Container>
    </Container>
  );
};

export default CreateTodoPage;
