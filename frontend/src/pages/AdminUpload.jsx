import { useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [msg, setMsg] = useState('');

    const handleUpload = async () => {
        try {
            const logs = JSON.parse(jsonInput);
            const res = await axios.post('/api/attendance/upload', { logs });
            setMsg(res.data.message);
        } catch (err) {
            setMsg('Error: Invalid JSON or Server Error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Upload Attendance Data</h2>
            <p className="text-sm text-gray-500 mb-4">Paste JSON array of attendance logs.</p>

            <div className="bg-gray-50 p-4 border rounded mb-4 text-xs font-mono text-gray-600">
                Format example:<br />
                [<br />
                &nbsp;&nbsp;{`{ "user_id": 1, "date": "2023-10-01", "in_time": "09:15", "out_time": "17:45" }`},<br />
                &nbsp;&nbsp;{`{ "user_id": 2, "date": "2023-10-01", "in_time": "08:55", "out_time": "18:10" }`}<br />
                ]
            </div>

            <textarea
                className="w-full h-64 border p-2 rounded font-mono text-sm mb-4"
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                placeholder="Past JSON here..."
            ></textarea>

            {msg && <div className="mb-4 p-2 bg-gray-100 border rounded">{msg}</div>}

            <button
                onClick={handleUpload}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Process Upload
            </button>
        </div>
    );
};

export default AdminUpload;
