import fs from "fs";
import path from "path";
import { compare, hash } from "bcryptjs";

export type UserRecord = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  passwordHash: string;
  createdAt: string;
};

const usersFile = path.join(process.cwd(), "src", "lib", "users.json");

function ensureUsersFile() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2), "utf-8");
  }
}

function readUsers(): UserRecord[] {
  ensureUsersFile();
  const raw = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(raw) as UserRecord[];
}

function writeUsers(users: UserRecord[]) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

export async function findUserByEmail(email: string): Promise<UserRecord | undefined> {
  const users = readUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<UserRecord> {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("A user with that email already exists.");
  }

  const passwordHash = await hash(data.password, 10);
  const newUser: UserRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  const users = readUsers();
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export async function verifyCredentials(email: string, password: string): Promise<UserRecord | null> {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const isValid = await compare(password, user.passwordHash);
  return isValid ? user : null;
}
