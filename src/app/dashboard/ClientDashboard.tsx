"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ClientDashboard({
  session,
}: {
  session: Session | null;
}) {
  useEffect(() => {
    if (session && typeof window !== "undefined") {
      const hasWelcomed = sessionStorage.getItem("welcomed");
      if (!hasWelcomed) {
        toast.success(`Welcome ${session.user?.name}`);
        sessionStorage.setItem("welcomed", "true");
      }
    }
  }, [session]);  


  return (
    <div>
      <p>Welcome {session?.user?.name}</p>
      <button type="button" onClick={() => signOut({ callbackUrl: "/login" })}>
        Logout
      </button>
    </div>
  );
}
