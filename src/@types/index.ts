export interface UserType {
  name: string;
  age: number;
}

export type Status = "success" | "error" | "pending";

export interface TeacherTypeApi {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  password: number;
  status: string;
}
export interface AdminTypeApi {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}
export interface MenagerTypeApi {
  _id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
}

export interface DataType<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
}
