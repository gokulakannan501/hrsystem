import { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, X } from 'lucide-react';

const ManagerApprovals = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = () => {
        axios.get('/api/leave/pending')
            .then(res => setRequests(res.data))
            .catch(console.error);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id, status) => {
        const comment = status === 'rejected' ? prompt("Rejection Reason:") : null;
        if (status === 'rejected' && !comment) return;

        try {
            await axios.post('/api/leave/action', { requestId: id, status, comment });
            fetchRequests();
        } catch (err) {
            alert('Action failed');
        }
    };

    return (
        <div className="bg-white rounded shadow text-sm">
            <div className="p-4 border-b font-bold flex justify-between">
                <span>Pending Approvals</span>
                <span className="text-gray-400 font-normal">{requests.length} Requests</span>
            </div>
            {requests.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No pending requests</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600">
                                <th className="p-3">Employee</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Dates</th>
                                <th className="p-3">Reason</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req.id} className="border-t">
                                    <td className="p-3 font-medium">{req.employee_name}</td>
                                    <td className="p-3 capitalize">{req.type}</td>
                                    <td className="p-3 text-gray-500">
                                        {req.date_from} → {req.date_to}
                                    </td>
                                    <td className="p-3 text-gray-600 max-w-xs truncate">{req.reason}</td>
                                    <td className="p-3 text-right space-x-2">
                                        <button
                                            onClick={() => handleAction(req.id, 'approved')}
                                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                                        >
                                            <Check size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleAction(req.id, 'rejected')}
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <X size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManagerApprovals;
