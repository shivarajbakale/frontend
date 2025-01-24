import TodoForm from "@/components/organisms/forms/CreateTodo";
import { Container } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const CreateTodoPage = () => {
  const handleSubmit = (values: any) => {
    notifications.show({
      title: "Todo Created",
      message: "Todo created successfully",
      color: "green",
    });
  };

  return (
    <Container className="flex justify-center items-center h-screen">
      <Container className="w-[50%] mb-[200px]">
        <TodoForm onSubmit={handleSubmit} />
      </Container>
    </Container>
  );
};

export default CreateTodoPage;
