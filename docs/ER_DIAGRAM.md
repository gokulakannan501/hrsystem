# HR Automation System - Documentation

## 1. ER Diagram (Schema)

We use **SQLite** for the local database.

### **Users (Employees)**
| Field | Type | Description |
|---|---|---|
| id | INTEGER PK | Auto-increment ID |
| name | TEXT | Full Name |
| email | TEXT | Unique Email |
| password | TEXT | Hashed Password |
| role | TEXT | 'admin' (HR), 'manager', 'employee' |
| manager_id | INTEGER | Self-referencing FK to Users.id |

### **Attendance**
| Field | Type | Description |
|---|---|---|
| id | INTEGER PK | Auto-increment ID |
| user_id | INTEGER | FK to Users.id |
| date | TEXT | YYYY-MM-DD |
| in_time | TEXT | HH:MM (24h) |
| out_time | TEXT | HH:MM (24h) |
| allowed_in | TEXT | Default 09:00 |
| allowed_out | TEXT | Default 18:00 |
| late_minutes | INTEGER | Calculated |
| early_minutes | INTEGER | Calculated |
| lost_minutes | INTEGER | Total lost time |
| status | TEXT | 'present', 'absent', 'leave' |

### **LeaveRequests**
| Field | Type | Description |
|---|---|---|
| id | INTEGER PK | Auto-increment ID |
| user_id | INTEGER | FK to Users.id |
| date_from | TEXT | YYYY-MM-DD |
| date_to | TEXT | YYYY-MM-DD |
| type | TEXT | 'sick', 'casual', 'medical' |
| reason | TEXT | Description |
| status | TEXT | 'pending', 'approved', 'rejected' |
| manager_comment | TEXT | Optional comment |
| created_at | DATETIME | Timestamp |

---

## 2. API Endpoints

### **Auth**
- `POST /api/auth/login` -> { token, user }

### **Employees**
- `POST /api/leave/apply` -> Body: { date_from, date_to, type, reason }
- `GET /api/leave/my-history`
- `GET /api/attendance/my-log`
- `GET /api/reports/my-monthly`

### **Managers**
- `GET /api/leave/pending` -> List of pending requests for team
- `POST /api/leave/approve` -> Body: { requestId }
- `POST /api/leave/reject` -> Body: { requestId, comment }
- `GET /api/attendance/team-log`

### **HR (Admin)**
- `POST /api/attendance/upload` -> Bulk upload (JSON/CSV)
- `GET /api/reports/project-loss`
- `GET /api/users` -> List all users

