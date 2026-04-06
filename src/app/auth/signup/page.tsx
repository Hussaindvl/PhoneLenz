"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password !== retypePassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        retypePassword,
        phone,
      }),
    });

    setIsLoading(false);
    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Unable to create your account.");
      return;
    }

    router.push("/auth/signin");
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 sm:flex">
        <div className="hidden sm:block sm:w-1/2 bg-gradient-to-br from-slate-900 via-blue-700 to-blue-500 p-10 text-white">
          <div className="space-y-8">
            <h1 className="text-4xl font-semibold tracking-tight">Create a PhoneLenz account</h1>
            <p className="text-base leading-8 text-slate-100">
              Register with your details to unlock faster purchases, sell listings, and repair tracking.
            </p>
            <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Secure signup</p>
              <p className="mt-3 text-sm text-slate-100">
                We protect your account with strong password hashing and email-based login.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2 p-8 sm:p-10">
          <div className="mx-auto max-w-md">
            <h2 className="text-3xl font-semibold text-slate-900">Sign Up</h2>
            <p className="mt-3 text-sm text-slate-500">
              Already have an account? <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-700">Sign in</Link> instead.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="John"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Doe"
                  />
                </label>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Phone Number</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="(123) 456-7890"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Create a strong password"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Retype Password</span>
                  <input
                    type="password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Confirm your password"
                  />
                </label>
              </div>

              {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoading ? "Creating account…" : "Create account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
