import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import BoardsPage from '../pages/BoardsPage';
import BoardTasksPage from '../pages/BoardTasksPage';

import { AuthProvider } from '../context/AuthContext';
import { PrivateRoute } from '../components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<BoardTasksPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
