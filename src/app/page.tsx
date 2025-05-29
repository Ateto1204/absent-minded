"use client";

import { useRouter } from "next/navigation";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

export default function HomePage() {
    const router = useRouter();
    const [language, setLanguage] = useState<"en" | "zh">("en");
    const toggleLanguage = () =>
        setLanguage((prev) => (prev === "en" ? "zh" : "en"));

    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white px-4">
            <div className="absolute top-4 right-4">
                <Button
                    onClick={toggleLanguage}
                    className="text-white bg-gray-700 hover:bg-gray-600"
                    size="1"
                >
                    {language === "en" ? "中文" : "Eng"}
                </Button>
            </div>
            <h1 className="text-5xl font-bold mb-4">
                {language === "en" ? "Absent Minded" : "Absent Minded"}
            </h1>
            <Flex
                align="center"
                className="text-lg text-zinc-400 max-w-2xl text-center mb-8 min-h-20"
            >
                {language === "en"
                    ? "The mind-mapping powered to-do list. Break down your tasks into manageable pieces using structured, visual thinking. Stay focused. Stay clear."
                    : "一款透過心智圖方式拆解任務的待辦系統，幫助你理清思緒、聚焦重點、化繁為簡。"}
            </Flex>
            <Button
                onClick={() => router.push("/login")}
                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
                {language === "en" ? "Get Started" : "開 始"}
            </Button>
            <footer className="absolute bottom-4 text-sm text-zinc-500">
                © 2025 東毅中. All rights reserved.
            </footer>
        </main>
    );
}
