import type { Role } from "./roles";
export type User = {
  uid: string;
  fullName: string;
  profilePhotoKey : string | null;
  role : Role;
  email : string
};