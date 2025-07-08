"use client"

import { loginAdmin } from "@/lib/api/admin"
import { useState } from "react"


export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const admin = await loginAdmin(email, password)
      console.log("Login berhasil:", admin)
      window.location.href = "/admin"
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
