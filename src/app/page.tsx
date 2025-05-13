'use client'

import { useEffect } from 'react'
import Flow from './components/Flow'
import { supabase } from './lib/supabase'

export default function Home() {
  useEffect(() => {
    const getToken = async () => {
      // 方法一：從 Supabase session 取出 access token
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        console.log('🔐 Token from session:', data.session.access_token)
      }

      // 方法二（補強）：從 URL 的 hash 拿 access_token（Google OAuth 有可能放在這）
      const hash = window.location.hash
      const match = hash.match(/access_token=([^&]*)/)
      if (match) {
        console.log('🔐 Token from hash:', match[1])
      }
    }

    getToken()
  }, [])

  return (
    <main>
      <h1>React Flow Demo</h1>
      <Flow />
    </main>
  )
}
