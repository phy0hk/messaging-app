const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');

// route related
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoutes');
const profileRoutes = require('./routes/profile');
//const friendRoutes = require('./routes/friend');

const app = express();
const server = http.createServer(app); // http server
const io = new Server(server); // attach socket.io to server
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Testing
app.get('/', (req, res) => {
    res.send('API is working');
});

const pool = require('./db');
const { Socket } = require('dgram');
pool.query(
    "SELECT NOW()",
    (err, res) => {
        if(err) {
            console.error('Database connection error:', err);
        } else {
            console.log('Database connected', res.rows[0]);
        }
    }
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    //Handle user login (from frontend)
    socket.on('user-online', async(userId) => {
        console.log(`User ${userId} is online`);
        await pool.query(
            'UPDATE users SET status = $1 WHERE id = $2',
            ['online', userId]
        );
        socket.broadcast.emit('status-update', { userId, status: 'online' });
    });

    // Handle user disconnect
    socket.on('disconnect', async() => {
        console.log(`user ${socket.id} disconnected`);

        // Provide real user id to map socket id
        const userId = socket.userId;
        if(userId) {
            const lastSeen = new Date();
            await pool.query(
                'UPDATE users SET status = $1, last_seen = $2 WHERE id = $3',
                ['offline', lastSeen, userId]
            );
            socket.broadcast.emit('status-update', { userId, status: 'offline', lastSeen });
        }
    });
});

app.use('/api', profileRoutes);

//app.use('/api/friend', friendRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
