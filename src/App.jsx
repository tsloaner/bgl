import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Stats from './pages/Stats';
import Members from './pages/Members';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
