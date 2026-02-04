import type { User } from "../types/user";
import { http } from "./http";

export async function userDetails(): Promise<User | undefined> {
  try {
    let res = await http.get(`/userdetails`);
    return res.data;
  } catch (err) {
    alert(err);
    return undefined;
  }
}
