import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage'
import LoginPage from './Pages/LoginPage'
import ChatPage from './Pages/ChatPage';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/success" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
