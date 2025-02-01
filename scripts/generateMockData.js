import { writeFileSync } from "fs";
import { join } from "path";
import _ from "lodash";
import { faker } from "@faker-js/faker";

const TOTAL_USERS = 10;
const TODOS_PER_USER = 5;

const generateTodos = (userId) => {
  return _.times(TODOS_PER_USER, (index) => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 4, max: 8 }),
    description: faker.lorem.paragraph(),
    completed: faker.datatype.boolean(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));
};

const generateUsers = () => {
  return _.times(TOTAL_USERS, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      id: faker.string.uuid(),
      firstName,
      lastName,
    };
  });
};

// Generate data
const users = generateUsers();
const todos = _.flatMap(users, (user) => generateTodos(user.id));

const mockData = {
  todos,
  users,
};

// Write to db.json with pretty formatting
writeFileSync(
  join(process.cwd(), "db.json"),
  JSON.stringify(mockData, null, 2),
  "utf-8",
);

console.log(`✨ Mock data has been generated successfully!
Generated ${users.length} users and ${todos.length} todos.`);
