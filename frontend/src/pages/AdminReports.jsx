import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReports = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
        axios.get('/api/reports/project-loss')
            .then(res => setReport(res.data))
            .catch(console.error);
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Project Loss Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-gray-500 text-xs uppercase">Overall Loss</div>
                    <div className="text-2xl font-bold text-red-600">
                        {report.reduce((acc, curr) => acc + parseFloat(curr.loss_percent), 0) > 0
                            ? (report.reduce((acc, curr) => acc + parseFloat(curr.loss_percent), 0) / report.length).toFixed(2)
                            : 0}%
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow text-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="p-3">Employee</th>
                            <th className="p-3">Days</th>
                            <th className="p-3">Lost Hours</th>
                            <th className="p-3">Loss %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((row, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="p-3 font-medium">{row.name}</td>
                                <td className="p-3">{row.total_days}</td>
                                <td className="p-3 text-red-500">{row.total_lost_hours}h</td>
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-100 rounded overflow-hidden">
                                            <div
                                                className={`h-full ${row.loss_percent > 5 ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${Math.min(row.loss_percent, 100)}%` }}
                                            ></div>
                                        </div>
                                        <span>{row.loss_percent}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReports;
