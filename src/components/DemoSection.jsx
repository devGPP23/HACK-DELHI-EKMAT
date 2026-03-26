import React, { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


export default function DemoSection() {
    const { t } = useLanguage();
    const playerRef = useRef(null);

    useEffect(() => {
        // Load YouTube IFrame Player API code asynchronously
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // This function creates an <iframe> (and YouTube player)
        // after the API code downloads.
        window.onYouTubeIframeAPIReady = () => {
            createPlayer();
        };

        // If API is already ready (e.g. on re-navigation), manually trigger init
        if (window.YT && window.YT.Player) {
            createPlayer();
        }

        function createPlayer() {
            if (playerRef.current) return; // Already created
            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: 'ymg0XE0sue8', // The video ID from the user's link
                playerVars: {
                    'playsinline': 1,
                    'controls': 1,
                    'mute': 1, // Mute needed for autoplay in most browsers
                    'autoplay': 1,
                    'rel': 0, // No related videos from other channels
                },
                events: {
                    'onReady': onPlayerReady
                }
            });
        }

    }, []);

    const onPlayerReady = (event) => {
        const player = event.target;
        player.mute(); // Ensure muted
        player.setPlaybackRate(1.5); // Set Speed to 1.5x
        player.playVideo(); // Autoplay
    };

    return (
        <section className="bg-white border-b border-slate-200 py-20 relative overflow-hidden">
            {/* Background Gradients & Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_50%)]" />

            <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-8 rounded-full">
                    <Play size={12} className="fill-current" />
                    {t('labelWalkthrough')}
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    {t('demoTitlePre')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-orange-500">{t('demoTitleHighlight')}</span>
                </h2>

                <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-lg">
                    {t('demoDesc')}
                </p>

                {/* Video Container */}
                <div className="relative aspect-video max-w-4xl mx-auto overflow-hidden shadow-2xl shadow-indigo-200 border border-slate-200 rounded-xl group bg-black">
                    {/* The API will replace this div with the iframe */}
                    <div id="youtube-player" className="w-full h-full"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            </div>
        </section>
    );
}
