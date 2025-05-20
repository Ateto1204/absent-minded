"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleEmailLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
            setMessage("登入失敗：" + error.message);
        } else {
            setMessage("✅ 驗證信已寄出，請查看信箱");
        }

        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/flow`,
            },
        });

        if (error) {
            setMessage("Google 登入失敗：" + error.message);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen p-4 space-y-4">
            <h1 className="text-2xl font-bold">登入</h1>

            {/* Email 登入 */}
            <input
                type="email"
                placeholder="請輸入 Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-4 py-2 rounded w-full max-w-sm"
            />
            <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "寄送中..." : "寄送登入信"}
            </button>

            {/* Google 登入 */}
            <div className="relative w-full max-w-sm flex items-center justify-center">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">或</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
                使用 Google 登入
            </button>

            {/* 訊息提示 */}
            <p className="mt-4 text-sm text-gray-600">{message}</p>
        </main>
    );
}
