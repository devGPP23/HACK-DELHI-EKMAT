
import React, { useRef } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { ArrowRight, Activity, TrendingUp, Landmark as VoteIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LandingPage({ onStart, onImpact }) {
    const { t } = useLanguage();

    return (
        <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 flex items-center relative overflow-hidden">
            {/* Background Patterns */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />

            {/* Decorative BG element (Right) */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            {/* Decorative BG element (Left) */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                {/* Left Content */}
                <div className="space-y-8">

                    {/* EKMAT Logo Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm transition-transform hover:scale-105">
                            <VoteIcon className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold tracking-tight text-slate-900 leading-none">
                                {t('title')}
                            </h2>
                            <p className="text-[10px] font-semibold text-slate-500">{t('tagline')}</p>
                            <p className="text-[10px] text-orange-600 uppercase tracking-[0.2em] font-bold">One Nation • One Election</p>
                        </div>
                    </div>


                    <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 drop-shadow-sm">
                        {t('titleSync')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">{t('titleDemocracy')}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                        {t('descLanding')}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <button
                            onClick={onStart}
                            className="bg-orange-600 hover:bg-orange-700 text-white transition-all hover:scale-105 active:scale-95 px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-orange-200 flex items-center gap-2 group ring-2 ring-orange-100"
                        >
                            {t('btnLaunch')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={onImpact}
                            className="px-8 py-4 rounded-xl text-lg font-bold text-slate-600 hover:bg-white hover:shadow-md border border-slate-200 transition-all bg-white/50"
                        >
                            {t('btnImpact')}
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                        <div>
                            <div className="text-3xl font-bold text-slate-900">₹15k Cr</div>
                            <div className="text-sm text-slate-500">{t('stat1Label')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">450+</div>
                            <div className="text-sm text-slate-500">{t('stat2Label')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">100%</div>
                            <div className="text-sm text-slate-500">{t('stat3Label')}</div>
                        </div>
                    </div>
                </div>

                {/* Right Content - Map */}
                <div className="relative flex justify-center perspective-1000">
                    <div className="transition-transform duration-500 hover:scale-[1.02] drop-shadow-2xl">
                        <InteractiveMap />
                    </div>
                </div>

            </div>
        </section>
    );
}
