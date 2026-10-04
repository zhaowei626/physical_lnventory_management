import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { UserManagement } from './pages/system/UserManagement';
import { RoleManagement } from './pages/system/RoleManagement';
import { PermissionManagement } from './pages/system/PermissionManagement';
import { useAppStore } from './store';
import { Toaster } from 'sonner';

// 路由守卫
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useAppStore((state) => state.userInfo);
  return userInfo ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="system">
              <Route path="user" element={<UserManagement />} />
              <Route path="role" element={<RoleManagement />} />
              <Route path="permission" element={<PermissionManagement />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
