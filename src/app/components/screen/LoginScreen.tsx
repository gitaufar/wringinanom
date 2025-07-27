"use client";

import { loginAdmin } from "@/lib/api/admin";
import { JSX, useState } from "react";
import Image from "next/image";

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    try {
      const admin = await loginAdmin(email, password);
      console.log("Login berhasil:", admin);
      window.location.href = "/admin/kependudukan";
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat login.";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative bg-[#4880FF] overflow-hidden font-nunito">
      {/* Background Image */}
      <Image
        src="/png/Union.png"
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-0"
        priority
      />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 px-8 py-10">
        <form onSubmit={(e) => void handleLogin(e)} className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Login to Account</h1>
            <p className="text-gray-500 font-medium">
              Please enter your email and password to continue
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </label>
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
              required
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberPassword}
              onChange={(e) => setRememberPassword(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="text-gray-600 text-sm">
              Remember Password
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
