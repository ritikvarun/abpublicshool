import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: String, default: 'campus' }, // category filter: campus | academics | labs | sports | events
  image: { type: String, required: true }, // Image URL (for backward compatibility)
  src: { type: String }, // duplicate image URL for frontend compatibility
  aspect: { type: String, default: 'aspect-square' }, // aspect-square | aspect-video
  glowColor: { type: String, default: 'group-hover:border-neon-lime/30' },
  desc: { type: String, default: '' }
}, { timestamps: true });

// Pre-save hook to ensure src is identical to image URL
gallerySchema.pre('save', function(next) {
  if (this.image && !this.src) {
    this.src = this.image;
  }
  next();
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
