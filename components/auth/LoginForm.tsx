//components\auth\LoginForm.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password");
        return;
      }

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>

      <div>
        <label className="block text-sm mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold"
      >
        Sign In
      </button>
    </form>
  );
}
