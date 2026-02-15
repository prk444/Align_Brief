// Shared in-memory user store
// Note: Data is lost on server restart - use a database for production

export const users = [
  {
    id: '1',
    fullName: 'Demo User',
    email: 'demo@example.com',
    company: 'Demo Company',
    password: 'demo123',
  },
];

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

export function addUser(user) {
  users.push(user);
  return user;
}

export function userExists(email) {
  return users.some((u) => u.email === email);
}
