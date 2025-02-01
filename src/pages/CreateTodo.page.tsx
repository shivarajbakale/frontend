import TodoForm from "@/components/organisms/forms/CreateTodo";
import { Container, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCreateTodo } from "@/utils/queries/todo.queries";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const CreateTodoPage = () => {
  const { mutate: createTodo, isSuccess } = useCreateTodo();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    createTodo(values);
    navigate("/");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/todos");
      notifications.show({
        title: "Todo Created",
        message: "Todo created successfully",
        color: "green",
      });
    }
  }, [isSuccess]);
  return (
    <Container className="flex justify-center items-center h-screen">
      <Container className="w-[50%] mb-[200px]">
        <Title order={2} className="text-center">
          Create Todo
        </Title>
        <TodoForm onSubmit={handleSubmit} />
      </Container>
    </Container>
  );
};

export default CreateTodoPage;
