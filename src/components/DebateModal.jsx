import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, Bot, ShieldQuestion, VolumeX } from 'lucide-react';

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function DebateModal({ onClose }) {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [statusText, setStatusText] = useState('Hold Mic to Speak a Topic (Any Language)');
    const [activeAgent, setActiveAgent] = useState(null); // 'lokniti' | 'lokmitra' | null
    const [currentAudio, setCurrentAudio] = useState(null);
    const [loknitiText, setLoknitiText] = useState("");
    const [lokmitraText, setLokmitraText] = useState("");

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // Cleanup audio on close
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.removeAttribute('src');
            }
        };
    }, [currentAudio]);

    // ==== RECORDING LOGIC ====
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                // Ignore empty/instant clicks that crash the Sarvam API natively
                if (audioChunksRef.current.length === 0) {
                    setStatusText("Recording too short. Hold to speak.");
                    return;
                }

                // Force WAV header to trick Sarvam FFmpeg into flexible decoding
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                stream.getTracks().forEach(track => track.stop());
                await processAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setStatusText("Listening... (Speak in any Indian language)");
            setLoknitiText("");
            setLokmitraText("");
            setActiveAgent(null);
        } catch (error) {
            console.error("Mic Access Error:", error);
            setStatusText("Mic Error. Please allow microphone access.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setStatusText("Transcribing your topic...");
        }
    };

    // ==== SEQUENCE ORCHESTRATION ====
    const processAudio = async (audioBlob) => {
        try {
            // 1. Sarvam Speech-To-Text
            const formData = new FormData();
            formData.append('file', audioBlob, 'voice.wav'); // Force ffmpeg proxy
            formData.append('model', 'saaras:v3');
            formData.append('language_code', 'unknown');

            const sarvamRes = await fetch('https://api.sarvam.ai/speech-to-text', {
                method: 'POST',
                headers: { 'api-subscription-key': SARVAM_API_KEY },
                body: formData
            });

            if (!sarvamRes.ok) {
                const errText = await sarvamRes.text();
                throw new Error(`STT rejected (${sarvamRes.status}): ${errText}`);
            }
            const sarvamData = await sarvamRes.json();
            const topic = sarvamData.transcript || sarvamData.text || '';

            if (!topic.trim()) {
                setStatusText("No speech detected. Please try again.");
                return;
            }

            setTranscript(topic);
            setStatusText(`Topic Detected: "${topic}". Connecting to Agents...`);

            // 2. Start Sequential Debate natively in detected language
            await startDebateSequence(topic);

        } catch (error) {
            console.error("STT Error:", error);
            setStatusText(`Error: ${error.message}`);
        }
    };

    const startDebateSequence = async (topic) => {
        try {
            const callGroq = async (prompt) => {
                if (!GROQ_API_KEY) throw new Error("VITE_GROQ_API_KEY is missing. Please add it to your .env.local file.");
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${GROQ_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [{ role: "user", content: prompt }],
                        response_format: { type: "json_object" },
                        temperature: 0.7
                    })
                });

                if (!response.ok) {
                    const err = await response.text();
                    throw new Error(`Groq API Error: ${response.status} - ${err}`);
                }
                const data = await response.json();
                return JSON.parse(data.choices[0].message.content);
            };

            // --- LOKNITI TURN (OPPOSITION) ---
            setActiveAgent('lokniti');
            setStatusText("LokNiti is formulating an argument...");

            const promptNiti = `You are LokNiti, an AI representing the opposition perspective on One Nation One Election.
The user's topic is: "${topic}".
1. Detect the native language of the user's topic.
2. Write a highly relevant, crisp, sharply focused 2-sentence counter-argument explaining exactly why simultaneous elections are dangerous regarding this specific topic IN THAT NATIVE LANGUAGE. Be highly contextual to the topic.
3. Return ONLY a valid JSON object matching this schema exactly: {"argument": "...", "languageCode": "xx-IN"}.
Valid languageCodes: hi-IN, en-IN, mr-IN, ta-IN, te-IN, gu-IN, bn-IN, kn-IN, ml-IN, pa-IN. Ensure the prefix is lowercase (e.g. hi-IN). Do NOT use markdown code blocks. Output JSON only.`;

            const nitiData = await callGroq(promptNiti);
            const formattedLangCodeNiti = (nitiData.languageCode || 'hi-IN').trim();

            setLoknitiText(nitiData.argument);
            setStatusText(`LokNiti is speaking [${formattedLangCodeNiti}]...`);

            await playVoice(nitiData.argument, formattedLangCodeNiti, "anand");

            // --- LOKMITRA TURN (PRO-ONOE) ---
            setActiveAgent('lokmitra');
            setStatusText("LokMitra is preparing a rebuttal...");

            const promptMitra = `You are LokMitra, the official AI Data Analyst supporting One Nation One Election.
The opposition (LokNiti) just argued: "${nitiData.argument}".
1. Write a highly relevant, crisp, sharply focused 2-sentence rebuttal defending ONOE against this specific point IN EXACTLY THE SAME LANGUAGE. Provide a data-driven or strictly logical defense.
2. Return ONLY a valid JSON object matching this schema exactly: {"argument": "...", "languageCode": "${formattedLangCodeNiti}"}. Do NOT use markdown code blocks. Output JSON only.`;

            const mitraData = await callGroq(promptMitra);

            setLokmitraText(mitraData.argument);
            setStatusText(`LokMitra is speaking [${mitraData.languageCode}]...`);

            await playVoice(mitraData.argument, mitraData.languageCode, "shubh");

            // --- END SEQUENCE ---
            setActiveAgent(null);
            setStatusText(`Debate Finished. Hold mic to start a new topic!`);

        } catch (error) {
            console.error("Debate Pipeline Error:", error);
            if (error.message.includes("429")) {
                setStatusText(`API Rate Limit Active. Please wait 60s before next debate.`);
            } else {
                setStatusText(`Pipeline Error: ${error.message}`);
            }
            setActiveAgent(null);
        }
    };

    // Promise-wrapped Audio Playback
    const playVoice = (text, langCode, speaker) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("https://api.sarvam.ai/text-to-speech/stream", {
                    method: "POST",
                    headers: {
                        "api-subscription-key": SARVAM_API_KEY,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        text,
                        target_language_code: langCode,
                        speaker,
                        model: "bulbul:v3",
                        pace: 1.05,
                        speech_sample_rate: 22050,
                        output_audio_codec: "mp3",
                        enable_preprocessing: true
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Sarvam API ${response.status}: ${errorText}`);
                }

                const chunks = [];
                const reader = response.body.getReader();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    chunks.push(value);
                }

                const blob = new Blob(chunks, { type: "audio/mpeg" });
                const audioURL = URL.createObjectURL(blob);
                const audio = new Audio(audioURL);
                setCurrentAudio(audio);

                audio.onended = () => {
                    URL.revokeObjectURL(audioURL);
                    resolve();
                };

                audio.onerror = (e) => reject(new Error("Audio playback source failure"));
                audio.play();

            } catch (error) {
                console.error("TTS Playback issue", error);
                reject(error);
            }
        });
    };

    // Stop current interaction safely
    const handleForceStop = () => {
        if (currentAudio) {
            currentAudio.pause();
        }
        setActiveAgent(null);
        setStatusText("Debate Cancelled.");
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-slate-100/80 backdrop-blur-md flex flex-col animate-in fade-in duration-300 font-sans">

            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-slate-200 relative z-10 bg-white shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
                        <span className="text-indigo-600">Spotlight</span> Debate
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Multi-agent analysis module. Provide an audio topic to watch the models analyze policy.</p>
                </div>
                <div className="flex items-center gap-4">
                    {activeAgent && (
                        <button onClick={handleForceStop} className="flex items-center gap-2 text-rose-700 hover:text-rose-800 font-semibold text-xs uppercase px-4 py-2 bg-rose-50 rounded-full transition-colors border border-rose-200">
                            <VolumeX size={14} /> Stop Agents
                        </button>
                    )}
                    <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition">
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Conversation Arena */}
            <div className="flex-1 overflow-hidden relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 p-8 bg-slate-50">

                {/* LOKNITI (Opposition) */}
                <div className={`relative flex flex-col items-center max-w-md w-full transition-all duration-700 ${activeAgent === 'lokniti' ? 'scale-105 opacity-100' : activeAgent === 'lokmitra' ? 'scale-95 opacity-50 grayscale-[20%]' : 'scale-100 opacity-90'}`}>
                    {activeAgent === 'lokniti' && <div className="absolute inset-0 bg-rose-100/50 blur-3xl rounded-full -z-10 animate-pulse"></div>}
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 mb-8 relative border-4 ${activeAgent === 'lokniti' ? 'bg-white border-rose-400 shadow-rose-200' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
                        <ShieldQuestion size={48} className={activeAgent === 'lokniti' ? 'text-rose-500' : 'text-slate-400'} />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md w-full text-center min-h-[160px] flex flex-col justify-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-100 text-rose-800 text-[11px] uppercase font-bold px-4 py-1 rounded-full tracking-wider border border-rose-200 shadow-sm">LokNiti (Counter-Perspective)</div>
                        {loknitiText ? (
                            <p className="text-[15px] font-medium text-slate-700 leading-relaxed">"{loknitiText}"</p>
                        ) : (
                            <p className="text-slate-400 text-sm">Waiting for topic analysis...</p>
                        )}
                    </div>
                </div>

                {/* VS Badge */}
                <div className="hidden md:flex flex-col items-center justify-center font-bold text-slate-300 text-2xl px-4">
                    VS
                </div>

                {/* LOKMITRA (Pro) */}
                <div className={`relative flex flex-col items-center max-w-md w-full transition-all duration-700 ${activeAgent === 'lokmitra' ? 'scale-105 opacity-100' : activeAgent === 'lokniti' ? 'scale-95 opacity-50 grayscale-[20%]' : 'scale-100 opacity-90'}`}>
                    {activeAgent === 'lokmitra' && <div className="absolute inset-0 bg-indigo-100/50 blur-3xl rounded-full -z-10 animate-pulse"></div>}
                    <div className={`w-28 h-28 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 mb-8 relative border-4 ${activeAgent === 'lokmitra' ? 'bg-white border-indigo-400 shadow-indigo-200' : 'bg-white border-slate-200 shadow-slate-200/50'}`}>
                        <Bot size={48} className={activeAgent === 'lokmitra' ? 'text-indigo-500' : 'text-slate-400'} />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md w-full text-center min-h-[160px] flex flex-col justify-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-100 text-indigo-800 text-[11px] uppercase font-bold px-4 py-1 rounded-full tracking-wider border border-indigo-200 shadow-sm">LokMitra (Pro-ONOE)</div>
                        {lokmitraText ? (
                            <p className="text-[15px] font-medium text-slate-700 leading-relaxed">"{lokmitraText}"</p>
                        ) : (
                            <p className="text-slate-400 text-sm">Awaiting opposition arguments...</p>
                        )}
                    </div>
                </div>

            </div>

            {/* Status Console */}
            <div className="text-center py-3 text-slate-500 font-mono text-xs uppercase tracking-widest bg-slate-50">
                {statusText}
            </div>

            {/* Bottom Controls */}
            <div className="p-8 border-t border-slate-200 bg-white flex flex-col items-center justify-center relative z-10 transition-colors shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">

                {transcript && <div className="absolute top-0 -translate-y-[150%] mb-4 px-5 py-2 bg-slate-800 rounded-full text-white text-[11px] font-mono shadow-xl uppercase tracking-wider backdrop-blur flex items-center gap-2">Detected <span className="text-emerald-400 font-bold">"{transcript}"</span></div>}

                <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    onMouseLeave={stopRecording}
                    disabled={activeAgent !== null}
                    className={`h-20 w-20 rounded-full flex items-center justify-center shadow-md transition-all duration-300 outline-none ${isRecording
                        ? 'bg-rose-500 text-white shadow-rose-300 shadow-lg scale-110'
                        : activeAgent !== null
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 hover:shadow-indigo-300 hover:shadow-lg'
                        }`}
                >
                    <Mic size={32} className={isRecording || activeAgent === null ? 'opacity-100' : 'opacity-50'} />
                </button>
                <div className="text-[11px] text-slate-500 uppercase tracking-[0.2em] mt-5 font-bold">
                    {activeAgent !== null ? "DEBATE IN PROGRESS" : isRecording ? "RECORDING TOPIC..." : "HOLD TO SPEAK"}
                </div>
            </div>

        </div>
    );
}
