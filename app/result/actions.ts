"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  buildAccessToken,
  isValidPassword,
  resultAccessCookie,
} from "./auth";

export async function unlockResult(formData: FormData) {
  const password = String(formData.get("password") ?? "").trim();
  const isAllowed = isValidPassword(password);

  if (!isAllowed) {
    redirect("/result?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(resultAccessCookie, buildAccessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/result",
    maxAge: 60 * 60 * 12,
  });

  redirect("/result");
}

export async function lockResult() {
  const cookieStore = await cookies();
  cookieStore.delete(resultAccessCookie);
  redirect("/result");
}
