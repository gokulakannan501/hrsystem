const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./database'); // Import the initialized structure

const hash = (pwd) => bcrypt.hashSync(pwd, 10);

// Wait a moment for tables to be created by database.js
setTimeout(() => {
    db.serialize(() => {
        console.log('Seeding database...');

        // Clear existing
        // db.run('DELETE FROM users');
        // db.run('DELETE FROM attendance');
        // db.run('DELETE FROM leave_requests');

        // Create Users
        const users = [
            { name: 'John Doe', email: 'john@company.com', pass: '123', role: 'employee' },
            { name: 'Mary Jane', email: 'mary@company.com', pass: '123', role: 'employee' },
            { name: 'Boss Man', email: 'manager@company.com', pass: '123', role: 'manager' },
            { name: 'HR Admin', email: 'admin@hr.com', pass: '123', role: 'admin' },
        ];

        users.forEach(u => {
            db.run(`INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
                [u.name, u.email, hash(u.pass), u.role]);
        });

        // Sample Attendance
        // John: Late 18m, Early 18m -> Lost 36m
        // Mary: Late 2m, Early 10m -> Lost 12m
        const logs = [
            { email: 'john@company.com', date: '2023-10-01', in: '09:18', out: '17:42', late: 18, early: 18, lost: 36 },
            { email: 'mary@company.com', date: '2023-10-01', in: '09:02', out: '17:50', late: 2, early: 10, lost: 12 },
            { email: 'john@company.com', date: '2023-10-02', in: '09:00', out: '18:00', late: 0, early: 0, lost: 0 },
        ];

        logs.forEach(log => {
            db.get('SELECT id FROM users WHERE email = ?', [log.email], (err, row) => {
                if (row) {
                    db.run(`INSERT INTO attendance (user_id, date, in_time, out_time, late_minutes, early_minutes, lost_minutes)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [row.id, log.date, log.in, log.out, log.late, log.early, log.lost]);
                }
            });
        });

        // Sample Leave
        db.get("SELECT id FROM users WHERE email='john@company.com'", (err, u) => {
            if (u) {
                db.run(`INSERT INTO leave_requests (user_id, date_from, date_to, type, reason) 
                VALUES (?, ?, ?, ?, ?)`, [u.id, '2023-10-05', '2023-10-06', 'sick', 'Feeling unwell']);
            }
        });

        console.log('Seeding complete! (Async operations might still be finishing)');
    });
}, 1000);
