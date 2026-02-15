import jwt from 'jsonwebtoken';
import { findUserByEmail } from '@/lib/userStore';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user
    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    return Response.json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Login failed: ' + error.message },
      { status: 500 }
    );
  }
}
