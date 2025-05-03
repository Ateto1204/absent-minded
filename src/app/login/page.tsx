'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setMessage('登入失敗：' + error.message)
    } else {
      setMessage('驗證信已寄出，請查看信箱')
    }

    setLoading(false)
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">登入</h1>
      <input
        type="email"
        placeholder="請輸入 Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded w-full max-w-sm mb-4"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? '寄送中...' : '寄送登入信'}
      </button>
      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </main>
  )
}
