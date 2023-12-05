"use server";
import { createUser } from "@/services/userService";
import { User } from "@/types/userTypes";

export async function createUserAction(formData: FormData) {
  try {
    const userData: User = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
    };
    const user = await createUser(userData);
    return { message: "User created successfully", user };
  } catch (error: any) {
    return { error: error.message };
  }
}
