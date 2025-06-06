export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  role: "doctor" | "patient";
  password: string;
}
