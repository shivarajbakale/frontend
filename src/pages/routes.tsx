import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Home.page';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
