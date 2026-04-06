"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);

    if (response?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 sm:flex sm:items-stretch">
        <div className="hidden sm:block sm:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 p-10 text-white">
          <div className="space-y-8">
            <h1 className="text-4xl font-semibold tracking-tight">Welcome back to PhoneLenz</h1>
            <p className="text-base leading-8 text-slate-100">
              Secure access for buyers and sellers. Login quickly with your email and password to manage orders, listings, and repairs.
            </p>
            <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Fast account access</p>
              <p className="mt-3 text-sm text-slate-100">
                Sign in to keep your profile, phone requests, and checkout details all in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-8 sm:p-10">
          <div className="mx-auto max-w-md">
            <h2 className="text-3xl font-semibold text-slate-900">Sign In</h2>
            <p className="mt-3 text-sm text-slate-500">
              New to PhoneLenz? <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-700">Create your account</Link>.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
