import ListTodo from "@/components/templates/ListTodo";
import { useTodos } from "@/utils/queries/todo.queries";

const ListTodoPage = () => {
  const { data: todos } = useTodos();
  return <ListTodo todos={todos || []} onDelete={() => {}} onEdit={() => {}} />;
};

export default ListTodoPage;
