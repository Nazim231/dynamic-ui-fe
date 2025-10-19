import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<>This project will be a Form Builder</>}>
          </Route>
        </Routes>
      </Router>
      <Toaster position='top-center' closeButton richColors />
    </>
  );
}

export default App;
