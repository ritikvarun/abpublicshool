import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';

// Load environmental variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_website';
    console.log('Connecting to database:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to database for seeding.');

    // 1. Seed Admin Account
    const defaultEmail = 'admin@school.com';
    const defaultPassword = 'admin123';

    const existingAdmin = await Admin.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const newAdmin = new Admin({
        email: defaultEmail,
        password: hashedPassword
      });
      await newAdmin.save();
      console.log(`Success: Seeded admin account with email "${defaultEmail}" and password "${defaultPassword}"`);
    } else {
      console.log('Admin account already exists. Skipping seeding.');
    }

    // 2. Seed Default School Settings
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      const defaultSettings = new Settings();
      await defaultSettings.save();
      console.log('Success: Seeded default school settings.');
    } else {
      console.log('School settings already exist. Skipping seeding.');
    }

    console.log('Seeding script completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding script error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
