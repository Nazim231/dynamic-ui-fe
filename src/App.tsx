import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBuilder } from '@/AppBuilder/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
