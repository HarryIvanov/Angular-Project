import { Card } from "./Card";

export interface User {
    _id: string;
    email: string;
    cards: Card[]
  }

