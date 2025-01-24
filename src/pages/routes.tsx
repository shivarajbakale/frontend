import { Route, Routes } from 'react-router-dom';
import CreateTodo from '../components/organisms/forms/CreateTodo';
import UpdateTodo from '../components/organisms/forms/UpdateTodo';
import { Welcome } from '../components/organisms/Welcome/Welcome';
import ListTodo from '../components/templates/ListTodo';
import { HomePage } from './Home.page';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/homepage" element={<HomePage />} />
      {/* Todo Create Route */}
      <Route path="/todo/create" element={<CreateTodo />} />
      {/* Todo Update Route */}
      <Route path="/todo/update/:id" element={<UpdateTodo />} />
      {/* Todo List Route */}
      <Route path="/todo/list" element={<ListTodo />} />
    </Routes>
  );
}
