const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/authMiddleware');

// Apply for Leave
router.post('/apply', auth(), (req, res) => {
    const { date_from, date_to, type, reason } = req.body;
    db.run(`INSERT INTO leave_requests (user_id, date_from, date_to, type, reason) VALUES (?, ?, ?, ?, ?)`,
        [req.user.id, date_from, date_to, type, reason],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Leave requested', id: this.lastID });
        });
});

// Get My history
router.get('/my-history', auth(), (req, res) => {
    db.all('SELECT * FROM leave_requests WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Manager: Get Pending
router.get('/pending', auth(['manager', 'admin']), (req, res) => {
    // Ideally filter by team (manager_id), getting all for now for simplicity or simplistic 'manager' role check
    // In a real app we'd join users on manager_id = req.user.id
    db.all(`
        SELECT l.*, u.name as employee_name 
        FROM leave_requests l 
        JOIN users u ON l.user_id = u.id 
        WHERE l.status = 'pending'
    `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Manager: Action
router.post('/action', auth(['manager', 'admin']), (req, res) => {
    const { requestId, status, comment } = req.body; // status: 'approved' | 'rejected'
    db.run('UPDATE leave_requests SET status = ?, manager_comment = ? WHERE id = ?',
        [status, comment, requestId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: `Leave ${status}` });
        });
});

module.exports = router;
