// services/userService.ts

import { db } from "@/libs/db";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

interface UserRegistrationData {
  email: string;
  password: string;
  name?: string;
}

export const createUser = async (userData: UserRegistrationData) => {
  const { email, password, name } = userData;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const username = nanoid(10);

  const user = await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      name,
    },
  });

  return user;
};
