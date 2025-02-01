export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
  preferences: {
    theme: "light" | "dark" | "system";
    notifications: boolean;
    language: "en" | "es" | "fr" | "de";
  };
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}
