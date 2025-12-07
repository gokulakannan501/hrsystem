import { useState } from 'react';
import axios from 'axios';

const LeaveApply = () => {
    const [form, setForm] = useState({
        date_from: '',
        date_to: '',
        type: 'casual',
        reason: ''
    });
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/leave/apply', form);
            setMsg('Leave request submitted successfully!');
            setForm({ date_from: '', date_to: '', type: 'casual', reason: '' });
        } catch (err) {
            setMsg('Failed to submit request');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
            {msg && <div className="p-2 mb-4 bg-blue-100 text-blue-700 rounded">{msg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">From Date</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            value={form.date_from}
                            onChange={e => setForm({ ...form, date_from: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">To Date</label>
                        <input
                            type="date"
                            className="w-full border p-2 rounded"
                            value={form.date_to}
                            onChange={e => setForm({ ...form, date_to: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Leave Type</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                    >
                        <option value="casual">Casual Leave</option>
                        <option value="sick">Sick Leave</option>
                        <option value="medical">Medical Leave</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Reason</label>
                    <textarea
                        className="w-full border p-2 rounded"
                        rows="3"
                        value={form.reason}
                        onChange={e => setForm({ ...form, reason: e.target.value })}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default LeaveApply;
