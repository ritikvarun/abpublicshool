import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/auth.js';
import settingsRoutes from './routes/settings.js';
import teacherRoutes from './routes/teachers.js';
import galleryRoutes from './routes/gallery.js';
import admissionRoutes from './routes/admissions.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite default port
  'http://localhost:5174', // Alternative Vite port
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Local Uploads Statically
const uploadDir = path.resolve(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('School Website API is Running...');
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admissions', admissionRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Local uploads served at http://localhost:${PORT}/uploads/`);
});
