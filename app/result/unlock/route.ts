import { NextResponse } from "next/server";
import {
  buildAccessToken,
  isValidPassword,
  resultAccessCookie,
} from "../auth";

export const runtime = "edge";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "").trim();
  const isAllowed = await isValidPassword(password);

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/result?error=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/result", request.url));
  response.cookies.set(resultAccessCookie, await buildAccessToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/result",
    maxAge: 60 * 60 * 12,
  });

  return response;
}
