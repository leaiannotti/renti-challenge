import './App.css';
import LoginComponent from './components/Login';
import { Routes,Route } from 'react-router-dom';
import RegisterComponent from './components/Register';
import LibrarianHomeComponent from './components/LibrarianHome';
import GuestHomeComponent from './components/GuestHome';
import BookwormHomeComponent from './components/BookwormHome';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent/>} />
          <Route path="/register" element={<RegisterComponent/>} />
          <Route path="/librarianHome" element={<LibrarianHomeComponent/>} />
          <Route path="/guestHome" element={<GuestHomeComponent/>} />
          <Route path="/bookWormHome" element={<BookwormHomeComponent/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;