import { Button, InputLabel, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { createTodoSchema } from "./create-todo.schema";
import { z } from "zod";

type FormValues = z.infer<typeof createTodoSchema>;

const CreateTodo = ({
  onSubmit,
}: {
  onSubmit: (values: FormValues) => void;
}) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: zodResolver(createTodoSchema),
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <div>
          <InputLabel>Title</InputLabel>
          <TextInput
            {...form.getInputProps("title")}
            placeholder="Enter todo title"
            error={form.errors.title}
            withAsterisk
          />
        </div>
        <div>
          <InputLabel>Description</InputLabel>
          <Textarea
            {...form.getInputProps("description")}
            placeholder="Enter todo description"
            error={form.errors.description}
          />
        </div>
        <Button type="submit" disabled={!form.isValid()}>
          Create Todo
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTodo;
