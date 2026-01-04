import React from 'react';
import { Calendar, Play, Pause } from 'lucide-react';

export default function TimelineSlider({ year, minYear, maxYear, onChange, isPlaying, onTogglePlay }) {
    // Calculate progress percentage
    const progress = ((year - minYear) / (maxYear - minYear)) * 100;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex items-center gap-4">
            <button
                onClick={onTogglePlay}
                className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all
          ${isPlaying
                        ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}
        `}
            >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>

            <div className="flex-1">
                <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        Simulation Timeline
                    </h3>
                    <span className="text-2xl font-bold font-serif text-slate-800">{year}</span>
                </div>

                <div className="relative h-6 flex items-center group">
                    {/* Track Background */}
                    <div className="absolute w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Slider Input */}
                    <input
                        type="range"
                        min={minYear}
                        max={maxYear}
                        value={year}
                        onChange={(e) => onChange(parseInt(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {/* Thumb Indicator (Visual only, follows progress) */}
                    <div
                        className="absolute w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-md z-0 pointer-events-none transition-all duration-300"
                        style={{ left: `calc(${progress}% - 8px)` }}
                    />

                    {/* Ticks */}
                    <div className="absolute top-4 w-full flex justify-between px-0.5">
                        {Array.from({ length: maxYear - minYear + 1 }).map((_, i) => (
                            (i % 5 === 0) && (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div className="w-0.5 h-1 bg-slate-300"></div>
                                    <span className="text-[10px] text-slate-400 font-medium">{minYear + i}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
