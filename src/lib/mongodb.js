import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, failed: false };
}

async function connectDB() {
  // If no MongoDB URI or previously failed, return null
  if (!MONGODB_URI || cached.failed) {
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected');
        return mongooseInstance;
      })
      .catch((err) => {
        console.log('⚠️ MongoDB connection failed:', err.message);
        cached.failed = true;
        cached.promise = null;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.conn || mongoose.connection.readyState !== 1) {
      cached.failed = true;
      return null;
    }
  } catch (e) {
    cached.failed = true;
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export function isConnected() {
  return mongoose.connection.readyState === 1;
}

export default connectDB;
