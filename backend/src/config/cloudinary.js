import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

let storage;
let isCloudinaryConfigured = false;

const isPlaceholder = (val) => {
  return !val || val.includes('your_') || val === '123456789012345';
};

const shouldUseCloudinary = 
  process.env.USE_CLOUDINARY !== 'false' &&
  !isPlaceholder(process.env.CLOUDINARY_CLOUD_NAME) &&
  !isPlaceholder(process.env.CLOUDINARY_API_KEY) &&
  !isPlaceholder(process.env.CLOUDINARY_API_SECRET);

if (shouldUseCloudinary) {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'school_website',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      // Auto convert to WebP/AVIF + auto compress quality + limit max width
      // This reduces a 4MB image to ~200-400KB automatically for fast loading
      transformation: [
        { fetch_format: 'auto', quality: 'auto', width: 1200, crop: 'limit' }
      ],
    },
  });
  
  isCloudinaryConfigured = true;
  console.log('Cloudinary storage engine initialized successfully.');
} else {
  console.warn('WARNING: Cloudinary credentials not configured or placeholder detected. Falling back to local Disk Storage.');
  
  const uploadDir = './public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

const upload = multer({ storage: storage });

export { cloudinary, upload, isCloudinaryConfigured };
