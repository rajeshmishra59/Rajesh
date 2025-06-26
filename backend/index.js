
// 👇 ये दो लाइनें जरूर जोड़ें सबसे ऊपर:
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

dotenv.config({ path: '.env' });
connectDatabase();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes); // student routes
app.use('/api/spaces', spaceRoutes);     // space routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
