import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId: string;
  username: string;
  name: string;
  role: "admin" | "editor" | "writer";
  isLoggedIn: boolean;
}

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "uwulr-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  },
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );
  return session;
}

export { sessionOptions };
