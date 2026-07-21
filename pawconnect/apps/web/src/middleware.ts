import { checkAccessToken } from "@/services/auth/auth";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    return checkAccessToken(req);
}