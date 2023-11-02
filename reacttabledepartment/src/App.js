import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Department from './Components/Department';
import Student from './Components/Student';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<Department />} />
          <Route path="/Department" element={<Department />} />
          <Route path="/Student" element={<Student />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;