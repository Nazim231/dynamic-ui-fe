import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBuilder } from '@/AppBuilder/index';
import { Page } from './AppBuilder/Page';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppBuilder />}>
            <Route path="/page" element={<Page />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position='top-center' closeButton richColors />
    </>
  );
}

export default App;
