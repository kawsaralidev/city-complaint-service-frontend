export type UserRole = "CITIZEN" | "OFFICER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
}
