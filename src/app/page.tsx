"use client";

import { useRouter } from "next/navigation";
import { Button, Flex, Box } from "@radix-ui/themes";
import { useState } from "react";
import Image from "next/image";
import { GithubIcon } from "lucide-react";

export default function HomePage() {
    const router = useRouter();
    const [language, setLanguage] = useState<"en" | "zh">("en");
    const toggleLanguage = () =>
        setLanguage((prev) => (prev === "en" ? "zh" : "en"));
    const [mode, setMode] = useState("whiteboard");

    return (
        <div>
            <div className="relative z-10">
                <main className="relative flex flex-col items-center justify-center min-h-[85vh] pt-8 bg-zinc-950 text-white px-4 pb-4">
                    <div className="absolute top-4 right-4">
                        <div className="flex gap-2">
                            <Button
                                size="1"
                                variant="ghost"
                                onClick={() =>
                                    window.open(
                                        "https://github.com/Ateto1204/absent-minded.git",
                                        "_blank"
                                    )
                                }
                            >
                                <GithubIcon />
                            </Button>
                            <Button
                                onClick={toggleLanguage}
                                className="text-white bg-gray-700 hover:bg-gray-600"
                                size="1"
                            >
                                {language === "en" ? "中文" : "Eng"}
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-5xl font-bold mb-4 text-center">
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
                </main>
            </div>

            <Box className="w-full bg-zinc-950 text-white pt-12 pb-10 px-6">
                <Box className="max-w-6xl mx-auto text-left">
                    <Box className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight">
                            Make sense of your notes with powerful visualizations.
                        </h1>
                        <p className="text-base md:text-lg max-w-2xl mb-10 text-zinc-400">
                            Explore your notes through flow, gantt, pie, and kanban boards to see how everything connects at a glance.
                        </p>
                    </Box>

                    <Flex gap="3" justify="start" wrap="wrap" className="mb-8">
                        {["Flow", "Gantt", "Kanban", "Pie"].map((modeName) => (
                            <Button
                                key={modeName}
                                variant={mode === modeName.toLowerCase() ? "solid" : "outline"}
                                size="2"
                                className={
                                    mode === modeName.toLowerCase()
                                        ? "px-6 py-3 text-white bg-[#2563EB] transition-colors"
                                        : "px-6 py-3 text-white border border-[#2563EB] transition-colors"
                                }
                                onClick={() => setMode(modeName.toLowerCase())}
                            >
                                {modeName}
                            </Button>
                        ))}
                    </Flex>

                    <Box className="w-full max-w-6xl h-96 bg-zinc-800 rounded-lg flex items-center justify-center text-white text-xl">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)} Mock Image
                    </Box>
                </Box>

                <Box className="max-w-6xl mx-auto text-left mt-12">
                    <Box className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight leading-tight">
                            Make sense of your notes with powerful visualizations.
                        </h1>
                        <p className="text-base md:text-lg max-w-2xl mb-10 text-zinc-400">
                            Explore your notes through flow, gantt, pie, and kanban boards to see how everything connects at a glance.
                        </p>
                    </Box>

                    <Flex gap="3" justify="start" wrap="wrap" className="mb-8">
                        {["Tree", "AI"].map((modeName) => (
                            <Button
                                key={modeName}
                                variant={mode === modeName.toLowerCase() ? "solid" : "outline"}
                                size="2"
                                className={
                                    mode === modeName.toLowerCase()
                                        ? "px-6 py-3 text-white bg-[#2563EB] transition-colors"
                                        : "px-6 py-3 text-white border border-[#2563EB] transition-colors"
                                }
                                onClick={() => setMode(modeName.toLowerCase())}
                            >
                                {modeName}
                            </Button>
                        ))}
                    </Flex>

                    <Box className="w-full max-w-6xl h-96 bg-zinc-800 rounded-lg flex items-center justify-center text-white text-xl">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)} Mock Image
                    </Box>
                </Box>
            </Box>

            <footer className="w-full text-center py-8 text-sm text-zinc-500 bg-zinc-950">
                © 2025 東毅中. All rights reserved.
            </footer>
        </div>
    );
}
