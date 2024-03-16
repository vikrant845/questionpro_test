export type User = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  profileImg?: string | null;
  role?: 'USER' | 'ADMIN';
}