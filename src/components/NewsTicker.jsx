import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { Newspaper, Bell } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize with a secondary API KEY specifically for the Ticker to bypass RPM limits 
const SECONDARY_KEY = import.meta.env.VITE_GEMINI2_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(SECONDARY_KEY);

export default function NewsTicker({ currentYearResult }) {
    const [headlines, setHeadlines] = useState([
        "LIVE: Election Commission strictly monitoring ONOE synchronized election cycle.",
        "National infrastructure projects report steady progress under uninterrupted Model Code of Conduct window."
    ]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!currentYearResult || !currentYearResult.warnings) return;

        const generateHeadline = async () => {
            if (currentYearResult.warnings.length === 0) {
                setHeadlines([
                    `[Year ${currentYearResult.year}] ECI confirms strong operational savings under One Nation One Election framework.`,
                    `Union Cabinet accelerates National Highway construction targets due to uninterrupted governance.`,
                    `Financial stability maintained across state elections.`
                ]);
                return;
            }

            try {
                setIsGenerating(true);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                const rawWarnings = currentYearResult.warnings.join("; ");
                const prompt = `You are a breaking news ticker generator for a political simulation dashboard.
The current year is ${currentYearResult.year}. 
The following chaotic events just occurred in the simulation: ${rawWarnings}.
Write TWO short, dramatic, highly realistic "Breaking News" headlines (Max 15 words each). 
Focus on the political crisis, constitutional debates, or logistical nightmares these events cause in an ONOE (One Nation One Election) framework.
Format exactly as a valid JSON array of strings: ["Headline 1", "Headline 2"]. Do NOT use markdown code blocks like \`\`\`json. Return ONLY the array.`;

                const result = await model.generateContent(prompt);
                const text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
                const newHeadlines = JSON.parse(text);

                if (Array.isArray(newHeadlines) && newHeadlines.length > 0) {
                    setHeadlines(newHeadlines);
                }
            } catch (err) {
                console.error("NewsTicker AI error:", err);
                const backup = currentYearResult.warnings.map(w => `BREAKING: ${w}`);
                setHeadlines(backup);
            } finally {
                setIsGenerating(false);
            }
        };

        generateHeadline();

    }, [currentYearResult?.year, currentYearResult?.warnings]);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-900 border-t border-slate-700/50 flex shadow-2xl">
            <div className="bg-red-600 text-white px-4 py-2 font-black tracking-widest text-xs uppercase flex items-center gap-2 z-10 shrink-0 shadow-[4px_0_15px_rgba(220,38,38,0.5)] relative">
                <Bell size={14} className={isGenerating ? 'animate-pulse' : ''} />
                LOKNITI NEWS
            </div>
            <div className="flex-1 flex items-center overflow-hidden bg-slate-900 text-slate-200">
                <Marquee speed={45} gradient={false} className="flex items-center leading-none pt-0.5">
                    {headlines.map((headline, idx) => (
                        <span key={idx} className="mx-8 font-mono text-[11px] font-semibold tracking-wide flex items-center gap-3">
                            <span className="text-red-500 animate-pulse">●</span> {headline}
                        </span>
                    ))}
                    {/* Duplicate slice to ensure smooth looping for short arrays */}
                    {headlines.map((headline, idx) => (
                        <span key={`dup-${idx}`} className="mx-8 font-mono text-[11px] font-semibold tracking-wide flex items-center gap-3">
                            <span className="text-red-500 animate-pulse">●</span> {headline}
                        </span>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}
