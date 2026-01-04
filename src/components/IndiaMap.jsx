import React from 'react';
import { motion } from 'framer-motion';
import { INDIAN_STATES, isStateSynchronized } from '../lib/simulationEngine';

export default function IndiaMap({ year, baseYear, onStateHover }) {
    // We'll render a grid of states since we don't have GeoJSON
    // This acts as a "Digital Twin" dashboard view of the states

    return (
        <div className="bg-slate-900 rounded-xl p-6 shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_70%)]" />

            <h3 className="text-slate-400 text-sm font-mono tracking-widest uppercase mb-8 z-10">
                Live Synchronization Matrix • {year}
            </h3>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 z-10 w-full max-w-4xl">
                {INDIAN_STATES.map((state, idx) => {
                    const isSynced = isStateSynchronized(state, year, baseYear);

                    return (
                        <motion.div
                            key={state.code}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.02 }}
                            onHoverStart={() => onStateHover && onStateHover(state.name)}
                            onHoverEnd={() => onStateHover && onStateHover(null)}
                            className="relative aspect-square"
                        >
                            {/* Pulse Effect for Synchronized States */}
                            {isSynced && (
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-emerald-500"
                                    initial={{ opacity: 0.5, scale: 1 }}
                                    animate={{ opacity: 0, scale: 1.5 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />
                            )}

                            {/* State Block */}
                            <motion.div
                                className={`
                  w-full h-full rounded-lg border flex flex-col items-center justify-center p-2 cursor-pointer
                  transition-colors duration-300 relative z-10
                  ${isSynced
                                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                        : 'bg-slate-800/50 border-slate-700/50 text-slate-500 hover:border-slate-600'}
                `}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-xl font-bold">{state.code}</span>
                                <span className="text-[10px] uppercase opacity-60 mt-1 hidden sm:block truncate w-full text-center">
                                    {state.name}
                                </span>

                                {/* Status Indicator Dot */}
                                <div className={`
                  absolute top-2 right-2 w-1.5 h-1.5 rounded-full
                  ${isSynced ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]' : 'bg-slate-600'}
                `} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-8 flex gap-6 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-xs text-slate-400">Synchronized</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-slate-700 border border-slate-600"></div>
                    <span className="text-xs text-slate-400">Desynchronized</span>
                </div>
            </div>
        </div>
    );
}
