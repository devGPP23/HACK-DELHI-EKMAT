import React from 'react';
import { Calendar, Play, Pause, Menu } from 'lucide-react';

export default function TimelineSlider({ year, minYear, maxYear, onChange, isPlaying, onTogglePlay, onOpenSettings }) {
    // Calculate progress percentage
    const progress = ((year - minYear) / (maxYear - minYear)) * 100;

    return (
        <div className="bg-white border-b border-slate-200 py-2 px-4 lg:px-8 flex items-center gap-3 w-full">
            <button
                onClick={onTogglePlay}
                className={`
          w-8 h-8 flex items-center justify-center transition-all rounded-full
          ${isPlaying
                        ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200'}
        `}
            >
                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
            </button>

            <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-1">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Calendar size={12} className="text-slate-400" />
                        Simulation Timeline
                    </h3>
                    <span className="text-lg font-bold font-serif text-slate-800 leading-none">{year}</span>
                </div>

                <div className="relative h-3 flex items-center group mt-1">
                    {/* Track Background */}
                    <div className="absolute w-full h-1 bg-slate-100 overflow-hidden rounded-full">
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
                        className="absolute w-3 h-3 bg-white border border-indigo-600 rounded-full shadow-sm z-0 pointer-events-none transition-all duration-300"
                        style={{ left: `calc(${progress}% - 6px)` }}
                    />

                    {/* Ticks */}
                    <div className="absolute top-2.5 w-full flex justify-between px-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Array.from({ length: maxYear - minYear + 1 }).map((_, i) => (
                            (i % 5 === 0) && (
                                <div key={i} className="flex flex-col items-center gap-0.5">
                                    <div className="w-px h-1 bg-slate-300"></div>
                                    <span className="text-[8px] text-slate-400 font-medium">{minYear + i}</span>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

            {/* Sandwich / Settings Button */}
            <button
                onClick={onOpenSettings}
                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 transition-colors rounded hover:text-indigo-600"
                title="Configure Simulation Parameters"
            >
                <Menu size={16} />
            </button>
        </div>
    );
}
