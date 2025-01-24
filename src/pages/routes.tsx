import { Welcome } from '@/components/Welcome/Welcome';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Home.page';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  );
}
