"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function ClientDashboard({
  session,
}: {
  session: Session | null;
}) {
  if (!session)
    return (
      <button type="button" onClick={() => signIn()}>
        Sign In
      </button>
    );

  return (
    <div>
      <p>Welcome {session?.user?.name}</p>
      <button type="button" onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </button>
    </div>
  );
}
