const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/authMiddleware');

// HR: Project Loss Report
router.get('/project-loss', auth(['admin']), (req, res) => {
    // Calculate total lost hours and percentage
    // Assuming 9 hours (540 mins) work day for simplicity
    const WORK_DAY_MINS = 540;

    db.all(`
        SELECT 
            u.name, 
            COUNT(a.id) as total_days,
            SUM(a.lost_minutes) as total_lost_mins
        FROM attendance a
        JOIN users u ON a.user_id = u.id
        GROUP BY u.id
    `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        const report = rows.map(row => {
            const totalWorkMins = row.total_days * WORK_DAY_MINS;
            const lossPercent = totalWorkMins > 0 ? ((row.total_lost_mins / totalWorkMins) * 100).toFixed(2) : 0;
            return {
                ...row,
                loss_percent: lossPercent,
                total_lost_hours: (row.total_lost_mins / 60).toFixed(2)
            };
        });

        res.json(report);
    });
});

module.exports = router;
