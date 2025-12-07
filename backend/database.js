const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'hr_system.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('admin', 'manager', 'employee')),
            manager_id INTEGER,
            FOREIGN KEY(manager_id) REFERENCES users(id)
        )`);

        // Attendance Table
        db.run(`CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            in_time TEXT,
            out_time TEXT,
            allowed_in TEXT DEFAULT '09:00',
            allowed_out TEXT DEFAULT '18:00',
            late_minutes INTEGER DEFAULT 0,
            early_minutes INTEGER DEFAULT 0,
            lost_minutes INTEGER DEFAULT 0,
            status TEXT DEFAULT 'present',
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // Leave Requests Table
        db.run(`CREATE TABLE IF NOT EXISTS leave_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            date_from TEXT NOT NULL,
            date_to TEXT NOT NULL,
            type TEXT NOT NULL,
            reason TEXT,
            status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
            manager_comment TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // Seed Admin User if not exists
        db.get("SELECT * FROM users WHERE email = 'admin@hr.com'", [], (err, row) => {
            if (!row) {
                const hash = bcrypt.hashSync('admin123', 10);
                db.run(`INSERT INTO users (name, email, password, role) VALUES ('HR Admin', 'admin@hr.com', ?, 'admin')`, [hash], (err) => {
                    if (!err) console.log("Admin seeded: admin@hr.com / admin123");
                });
            }
        });
    });
}

module.exports = db;
