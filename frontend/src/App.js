import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage'
import LoginPage from './Pages/LoginPage'
import ChatPage from './Pages/ChatPage';
import RegistrationPage from './Pages/RegistrationPage';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/success" element={<ChatPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
