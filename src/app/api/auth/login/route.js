import jwt from 'jsonwebtoken';
import connectDB, { isConnected } from '@/lib/mongodb';
import User from '@/models/User';
import { findUserByEmail } from '@/lib/userStore';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Try MongoDB first
    await connectDB();
    
    if (isConnected()) {
      // MongoDB is connected
      const user = await User.findOne({ email });

      if (!user) {
        return Response.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return Response.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const token = jwt.sign(
        { id: user._id.toString(), email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return Response.json({
        success: true,
        token,
        user: {
          id: user._id.toString(),
          fullName: user.fullName,
          email: user.email,
          company: user.company,
        },
      });
    } else {
      // Fallback to in-memory storage
      const user = findUserByEmail(email);

      if (!user || user.password !== password) {
        return Response.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...userWithoutPassword } = user;

      return Response.json({
        success: true,
        token,
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Login failed: ' + error.message },
      { status: 500 }
    );
  }
}
