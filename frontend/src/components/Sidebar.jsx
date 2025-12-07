import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Calendar, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="w-64 bg-slate-800 text-white min-h-screen flex flex-col">
            <div className="p-6 text-xl font-bold border-b border-slate-700">HR System</div>

            <div className="flex-1 p-4 space-y-2">
                <div className="text-xs text-slate-400 uppercase font-semibold mb-2">Menu</div>

                <Link to="/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-slate-700">
                    <LayoutDashboard size={18} /> Dashboard
                </Link>

                {user.role === 'employee' && (
                    <>
                        <Link to="/dashboard/leave" className="flex items-center gap-2 p-2 rounded hover:bg-slate-700">
                            <Calendar size={18} /> Apply Leave
                        </Link>
                    </>
                )}

                {(user.role === 'manager' || user.role === 'admin') && (
                    <>
                        <Link to="/dashboard/approvals" className="flex items-center gap-2 p-2 rounded hover:bg-slate-700">
                            <FileText size={18} /> Approvals
                        </Link>
                    </>
                )}

                {user.role === 'admin' && (
                    <>
                        <Link to="/dashboard/upload-attendance" className="flex items-center gap-2 p-2 rounded hover:bg-slate-700">
                            <Users size={18} /> Upload Data
                        </Link>
                        <Link to="/dashboard/reports" className="flex items-center gap-2 p-2 rounded hover:bg-slate-700">
                            <FileText size={18} /> Reports
                        </Link>
                    </>
                )}
            </div>

            <div className="p-4 border-t border-slate-700">
                <div className="mb-4">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                </div>
                <button onClick={logout} className="flex items-center gap-2 text-red-300 hover:text-red-100">
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
