"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {
  const [valid, setValid] = useState<boolean | null>(null)

  useEffect(() => {
    fetch("/api/auth/check-token")
      .then((res) => res.json())
      .then((data) => setValid(data.valid))
  }, [])

  return (
    <div>
      {valid === null
        ? "Mengecek token..."
        : valid
        ? "Token masih ada"
        : "Token tidak ada"}
    </div>
  )
}
