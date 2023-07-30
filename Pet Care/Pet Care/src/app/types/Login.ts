import { User } from "./user";

export interface LoginRequest {
    accessToken: string;
    user: User;
  }

