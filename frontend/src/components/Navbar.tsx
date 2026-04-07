import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold tracking-wide">Task Manager</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Hello, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 text-sm font-semibold px-3 py-1 rounded hover:bg-blue-50 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
