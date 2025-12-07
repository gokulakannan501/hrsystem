import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EmployeeHome from './EmployeeHome';
import LeaveApply from './LeaveApply';
import ManagerApprovals from './ManagerApprovals';
import AdminReports from './AdminReports';
import AdminUpload from './AdminUpload';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <header className="bg-white shadow p-4 mb-6">
                    <h1 className="text-xl font-bold text-gray-800">Overview</h1>
                </header>
                <main className="p-6">
                    <Routes>
                        <Route path="/" element={<EmployeeHome />} />
                        <Route path="/leave" element={<LeaveApply />} />
                        <Route path="/approvals" element={<ManagerApprovals />} />
                        <Route path="/reports" element={<AdminReports />} />
                        <Route path="/upload-attendance" element={<AdminUpload />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
