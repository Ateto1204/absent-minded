"use client";

import "@radix-ui/themes/styles.css";
import { Theme, Button } from "@radix-ui/themes";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const emailIsValid = (email: string) => {
    // simple validation
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
};

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.push("/flow");
            }
        };
        checkSession();
    }, [router]);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!emailIsValid(email)) {
            setError("請輸入有效的 Email");
            return;
        }
        setLoading(true);
        const { error: signError } = await supabase.auth.signInWithOtp({
            email,
        });
        if (signError) {
            setMessage("");
            setError("登入失敗：" + signError.message);
        } else {
            setMessage("驗證信已寄出，請查看信箱");
            setError("");
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setError("");
        setLoading(true);
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${BASE_URL}/flow` },
        });
        if (oauthError) {
            setError("Google 登入失敗：" + oauthError.message);
        }
        setLoading(false);
    };

    const isEmailValid = useMemo(() => emailIsValid(email), [email]);

    return (
        <Theme>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            登入你的 Absent Minded 帳號
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            使用 Email 或 Google 快速登入
                        </p>

                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
                                disabled={loading}
                            >
                                <FcGoogle className="w-5 h-5" />
                                <span className="flex-1">以 Google 登入</span>
                            </button>

                            <div className="relative flex items-center">
                                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                                <span className="px-3 text-xs text-gray-500 dark:text-gray-400">
                                    或使用 Email 登入
                                </span>
                                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                            </div>

                            <form
                                onSubmit={handleEmailLogin}
                                className="space-y-3"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        aria-invalid={!isEmailValid}
                                        aria-describedby="email-error"
                                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
                                    />
                                    {error && (
                                        <p
                                            id="email-error"
                                            className="mt-1 text-xs text-red-500"
                                        >
                                            {error}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    size="3"
                                    className="w-full"
                                    disabled={!isEmailValid || loading}
                                    loading={loading}
                                    radius="small"
                                >
                                    寄送登入信
                                </Button>
                            </form>
                            <div
                                aria-live="polite"
                                className="mt-2 min-h-[1.25rem] text-sm"
                            >
                                {message && (
                                    <p className="text-green-600 dark:text-green-400">
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Theme>
    );
}
