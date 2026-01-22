import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm py-4 mb-6 border-b border-gray-100">
        <div className="container max-w-3xl mx-auto px-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-800">
            Welcome{user?.name ? `, ${user.name}` : ''}
            </div>

            <button
            onClick={handleLogout}
            className="text-sm bg-indigo-600 text-white py-1.5 px-3 rounded hover:bg-indigo-700 cursor-pointer"
            >
            Logout
            </button>
        </div>
        </header>
    );
}
