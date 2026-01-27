"use client";

import { useRouter } from "next/navigation";
import { Button, Flex, Box } from "@radix-ui/themes";
import { useState } from "react";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

const mockImageSrc =
    "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22960%22%20height%3D%22384%22%20viewBox%3D%220%200%20960%20384%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20x2%3D%221%22%20y1%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23111827%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232563eb%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22960%22%20height%3D%22384%22%20fill%3D%22url(%23g)%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2248%22%20width%3D%22864%22%20height%3D%22288%22%20rx%3D%2224%22%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%2F%3E%3C%2Fsvg%3E";

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

                    <Box className="relative w-full max-w-6xl h-96 bg-zinc-800 rounded-lg overflow-hidden">
                        <Image
                            src={mockImageSrc}
                            alt={`${mode} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, 960px"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xl bg-black/20">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mock Image
                        </div>
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

                    <Box className="relative w-full max-w-6xl h-96 bg-zinc-800 rounded-lg overflow-hidden">
                        <Image
                            src={mockImageSrc}
                            alt={`${mode} preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, 960px"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xl bg-black/20">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mock Image
                        </div>
                    </Box>
                </Box>
            </Box>

            <footer className="w-full text-center py-8 text-sm text-zinc-500 bg-zinc-950">
                © 2025 東毅中. All rights reserved.
            </footer>
        </div>
    );
}
