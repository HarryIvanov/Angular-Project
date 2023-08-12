import { User } from "./user";

export interface LoginRequest {
  accessToken: string;
  user: {
      _id: string; // Make sure this property name matches the backend
      email: string;
      // Other user properties...
  };
}

