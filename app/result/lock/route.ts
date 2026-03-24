import { NextResponse } from "next/server";
import { resultAccessCookie } from "../auth";

export const runtime = "edge";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/result", request.url));
  response.cookies.delete(resultAccessCookie);
  return response;
}
