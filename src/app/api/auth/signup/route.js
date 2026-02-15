import jwt from 'jsonwebtoken';
import { userExists, addUser } from '@/lib/userStore';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request) {
  try {
    const { fullName, email, password, company } = await request.json();

    // Validation
    if (!fullName || !email || !password || !company) {
      return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    if (userExists(email)) {
      return Response.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      company,
      password,
    };

    addUser(newUser);

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    return Response.json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json(
      { error: 'Signup failed: ' + error.message },
      { status: 500 }
    );
  }
}
