import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeHome = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        axios.get('/api/attendance/my-log')
            .then(res => setLogs(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500 text-sm">Days Present</h3>
                    <p className="text-3xl font-bold">{logs.length}</p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500 text-sm">Late Validations</h3>
                    <p className="text-3xl font-bold text-orange-500">
                        {logs.filter(l => l.late_minutes > 0).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500 text-sm">Total Lost Time</h3>
                    <p className="text-3xl font-bold text-red-500">
                        {logs.reduce((acc, curr) => acc + (curr.lost_minutes || 0), 0) / 60 | 0}h
                    </p>
                </div>
            </div>

            <div className="bg-white rounded shadow text-sm">
                <div className="p-4 border-b font-bold">Recent Attendance</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600">
                                <th className="p-3">Date</th>
                                <th className="p-3">In</th>
                                <th className="p-3">Out</th>
                                <th className="p-3">Late/Early</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id} className="border-t">
                                    <td className="p-3">{log.date}</td>
                                    <td className="p-3">{log.in_time}</td>
                                    <td className="p-3">{log.out_time}</td>
                                    <td className="p-3 text-red-500">
                                        {log.lost_minutes > 0 ? `${log.lost_minutes}m` : '-'}
                                    </td>
                                    <td className="p-3">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeHome;
