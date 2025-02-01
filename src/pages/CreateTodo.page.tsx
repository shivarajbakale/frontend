import { Container, Title } from "@mantine/core";
import CreateTodoForm from "@/components/organisms/forms/CreateTodo";
import { useNavigate } from "react-router-dom";
import { useCreateTodo } from "@/utils/queries/todo.queries";

export const CreateTodoPage = () => {
  const { mutate: createTodo } = useCreateTodo();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    await createTodo(values);
    navigate("/todos");
  };

  return (
    <Container>
      <Title order={2} className="text-center">
        Create New Todo
      </Title>
      <Container w="75%">
        <CreateTodoForm onSubmit={handleSubmit} />
      </Container>
    </Container>
  );
};

export default CreateTodoPage;
