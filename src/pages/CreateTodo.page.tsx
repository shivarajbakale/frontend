import TodoForm from "@/components/organisms/forms/CreateTodo";
import { Container, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

const CreateTodoPage = () => {
  const handleSubmit = (values: any) => {
    console.log("These are the values", values);
    notifications.show({
      title: "Todo Created",
      message: "Todo created successfully",
      color: "green",
    });
  };

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
