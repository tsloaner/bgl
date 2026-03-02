import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Stats from './pages/Stats';
import Members from './pages/Members';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="stats" element={<Stats />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
