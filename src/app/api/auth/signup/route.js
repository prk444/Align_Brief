import jwt from 'jsonwebtoken';
import connectDB, { isConnected } from '@/lib/mongodb';
import User from '@/models/User';
import { userExists, addUser } from '@/lib/userStore';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request) {
  try {
    const { fullName, email, password, company } = await request.json();

    // Validation
    if (!fullName || !email || !password || !company) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Try MongoDB first
    await connectDB();
    
    if (isConnected()) {
      // MongoDB is connected
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return Response.json({ error: 'Email already registered' }, { status: 400 });
      }

      const newUser = await User.create({
        fullName,
        email,
        password,
        company,
      });

      const token = jwt.sign(
        { id: newUser._id.toString(), email: newUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return Response.json({
        success: true,
        token,
        user: {
          id: newUser._id.toString(),
          fullName: newUser.fullName,
          email: newUser.email,
          company: newUser.company,
        },
      });
    } else {
      // Fallback to in-memory storage
      if (userExists(email)) {
        return Response.json({ error: 'Email already registered' }, { status: 400 });
      }

      const newUser = {
        id: Date.now().toString(),
        fullName,
        email,
        company,
        password,
      };

      addUser(newUser);

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      return Response.json({
        success: true,
        token,
        user: userWithoutPassword,
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json(
      { error: 'Signup failed: ' + error.message },
      { status: 500 }
    );
  }
}
