import { User } from "./user.type.ts";

declare namespace Request {
  export interface Request {
    user: User
  }
}