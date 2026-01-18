"use client";

import "@radix-ui/themes/styles.css";
import { Theme, Button, Flex } from "@radix-ui/themes";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

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
                redirectTo: `${BASE_URL}/flow`,
            },
        });

        if (error) {
            setMessage("Google 登入失敗：" + error.message);
        }
    };

    return (
      <Theme>
        <Flex direction="column" align="center" justify="center" className="h-screen p-4 text-gray-800">
           <h1 className="text-xl font-bold w-full max-w-sm text-gray-600">登入你的 Absent Minded 帳號</h1>

           <Flex direction="column" gap="3" className="w-full max-w-sm">
             <Button  size="4"
               onClick={handleGoogleLogin}
               variant="outline"
               className="relative px-4 py-2 w-full flex justify-center items-center"
               highContrast
               radius="small"
             >
               <FcGoogle className="w-5 h-5 mr-2" />
               <span className="flex-1">使用 Google 登入</span>
             </Button>
             <hr className="w-full border border-gray-200" />
             <label className="text-xs text-gray-500">電子郵件</label>
             <input
               type="email"
               placeholder="請輸入 Email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="border border-gray-300 bg-transparent px-4 py-2 rounded w-full text-white"
             />
             <Button
                size="4"
                onClick={handleEmailLogin}
                loading={loading}
                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full"
                radius="small"
                >
                寄送登入信
            </Button>
           </Flex>

            {/* 訊息提示 */}
            <p className="mt-4 text-sm text-gray-600">{message}</p>
        </Flex>
      </Theme>
    );
}
