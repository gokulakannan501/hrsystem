const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/authMiddleware');

// Upload Attendance (Bulk or Single)
router.post('/upload', auth(['admin']), (req, res) => {
    // Expects: { logs: [{ user_id, date, in_time, out_time }] }
    const { logs } = req.body;

    if (!logs || !Array.isArray(logs)) {
        return res.status(400).json({ message: 'Invalid data format' });
    }

    const stmt = db.prepare(`
        INSERT INTO attendance (user_id, date, in_time, out_time, late_minutes, early_minutes, lost_minutes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let processed = 0;
    logs.forEach(log => {
        const allowedIn = '09:00';
        const allowedOut = '18:00';

        // Calculate Minutes
        let late = 0;
        let early = 0;

        if (log.in_time > allowedIn) {
            late = getMinutesDiff(allowedIn, log.in_time);
        }
        if (log.out_time < allowedOut) {
            early = getMinutesDiff(log.out_time, allowedOut);
        }

        const lost = late + early;
        const status = 'present'; // Simplified for now

        stmt.run(log.user_id, log.date, log.in_time, log.out_time, late, early, lost, status, (err) => {
            if (err) console.error(err);
        });
        processed++;
    });

    stmt.finalize();
    res.json({ message: `Processed ${processed} records` });
});

// Get My Log
router.get('/my-log', auth(), (req, res) => {
    db.all('SELECT * FROM attendance WHERE user_id = ? ORDER BY date DESC', [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Helper: HH:MM Diff in Minutes
function getMinutesDiff(start, end) {
    const [h1, m1] = start.split(':').map(Number);
    const [h2, m2] = end.split(':').map(Number);
    return ((h2 * 60) + m2) - ((h1 * 60) + m1);
}

module.exports = router;
