import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './auth/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }) {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>

            {/* Public Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected dashboard */}
            <Route
                path="/"
                element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
