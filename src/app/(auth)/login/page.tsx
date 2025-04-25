"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleCredentialsLogin = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleCredentialsLogin}
        className="flex flex-col gap-4 max-w-md w-full"
      >
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login with Email
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
