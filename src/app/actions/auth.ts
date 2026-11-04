"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/supabase";
import { getSession } from "@/lib/session";

export async function login(prevState: string | null, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) return "Please fill in all fields.";

  const { data: user, error } = await db
    .from("users")
    .select("id, name, username, password_hash, role")
    .eq("username", username.trim().toLowerCase())
    .single();

  if (error || !user) return "Invalid username or password.";

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return "Invalid username or password.";

  const session = await getSession();
  session.userId = user.id;
  session.username = user.username;
  session.name = user.name;
  session.role = user.role;
  session.isLoggedIn = true;
  await session.save();

  redirect("/dashboard");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/dashboard/login");
}
