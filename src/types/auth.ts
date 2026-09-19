export type UserRole = "CITIZEN" | "OFFICER" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export type AuthProvider = "GOOGLE" | "CREDENTIALS";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  authProvider?: AuthProvider;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
}
