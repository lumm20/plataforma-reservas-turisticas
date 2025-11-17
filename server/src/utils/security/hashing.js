import bcrypt from 'bcrypt';

const rounds=10;
export async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, rounds);
}

export async function authenticate(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}