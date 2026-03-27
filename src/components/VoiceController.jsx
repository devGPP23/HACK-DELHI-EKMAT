import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2, Sparkles, X, Activity } from 'lucide-react';
import { INDIAN_STATES } from '../lib/simulationEngine';

// API Keys from Vite Env
const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function VoiceController({
    scenario,
    currentYearResult,
    setCurrentYear,
    updateScenario,
    triggerReelection,
    resetScenario
}) {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("Command me...");
    const [isOpen, setIsOpen] = useState(false);
    const [transcript, setTranscript] = useState("");

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        setTranscript("");
        setStatusText("Listening...");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                // Ignore empty clicks
                if (audioChunksRef.current.length === 0) {
                    setStatusText("Recording too short.");
                    return;
                }

                // Force WAV to trick Sarvam FFmpeg
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                stream.getTracks().forEach(track => track.stop());
                await processAudio(audioBlob);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Microphone access denied:", error);
            setStatusText("Mic Error. Check Permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsProcessing(true);
            setStatusText("Transcribing...");
        }
    };

    const processAudio = async (audioBlob) => {
        try {
            // Check api keys
            if (!SARVAM_API_KEY || !GROQ_API_KEY) {
                throw new Error("API Keys missing in .env.local");
            }

            // STEP 1: Sarvam Speech-to-Text
            const formData = new FormData();
            formData.append('file', audioBlob, 'voice.wav'); // Force ffmpeg proxy
            formData.append('model', 'saaras:v3');
            formData.append('language_code', 'unknown');

            const sarvamRes = await fetch('https://api.sarvam.ai/speech-to-text', {
                method: 'POST',
                headers: {
                    'api-subscription-key': SARVAM_API_KEY
                },
                body: formData
            });

            if (!sarvamRes.ok) {
                const errText = await sarvamRes.text();
                throw new Error(`Sarvam: ${sarvamRes.status} ${errText}`);
            }

            const sarvamData = await sarvamRes.json();
            const text = sarvamData.transcript || sarvamData.text || '';
            setTranscript(text);
            setStatusText("Analyzing Intent...");

            if (!text.trim()) {
                setStatusText("No speech detected.");
                setIsProcessing(false);
                return;
            }

            // STEP 2: Groq Intent Parsing
            const validStatesList = INDIAN_STATES.map(s => `${s.code} (${s.name})`).join(", ");
            const minYear = scenario.baseYear;
            const maxYear = scenario.baseYear + 15;

            const savingsData = currentYearResult ? (currentYearResult.cumulativeCostSavings / 1000).toFixed(1) : '0';
            const securityData = currentYearResult ? (currentYearResult.securityPeakDemand / 1000).toFixed(0) : '0';
            const govDays = currentYearResult?.totalGovernanceDaysGained || 0;
            const statesPolling = currentYearResult?.electionsScheduled?.length || 0;
            const curYear = currentYearResult?.year || minYear;

            const systemPrompt = `EKMAT Election Simulator AI. Parse user speech into JSON. Actions:
setYear: {"action":"setYear","year":N,"reply":"...","languageCode":"xx-IN"}
collapseGovt: {"action":"collapseGovt","stateCode":"XX","year":N,"reply":"...","languageCode":"xx-IN"} States: ${validStatesList}. Year: ${minYear}-${maxYear}.
setPreset: {"action":"setPreset","preset":"ideal|real|chaos","reply":"...","languageCode":"xx-IN"}
adjustSlider: {"action":"adjustSlider","slider":"collapseProbability|securityPhases","value":N,"reply":"...","languageCode":"xx-IN"} collapseProbability:0-1, securityPhases:1-7.
toggleLocalBodies: {"action":"toggleLocalBodies","value":true|false,"reply":"...","languageCode":"xx-IN"}
stressTest: {"action":"stressTest","active":true,"budgetCap":N,"securityCap":N,"staffCap":N,"reply":"...","languageCode":"xx-IN"}
resetAll: {"action":"resetAll","reply":"...","languageCode":"xx-IN"}
getInfo: {"action":"getInfo","reply":"<answer using live data>","languageCode":"xx-IN"} Live: Year=${curYear}, Savings=Rs${savingsData}kCr, Security=${securityData}k, GovDays=${govDays}, StatesPolling=${statesPolling}.
Rules: Detect user's language. Reply in SAME language. languageCode: hi-IN,en-IN,gu-IN,bn-IN,kn-IN,ml-IN,mr-IN,ta-IN,te-IN. Output ONLY JSON.`;

            const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: `Transcript: "${text}"` }
                    ],
                    temperature: 0.1,
                    response_format: { type: "json_object" }
                })
            });

            if (!groqRes.ok) {
                const groqErr = await groqRes.text();
                throw new Error(`Groq: ${groqRes.status} ${groqErr}`);
            }

            const groqData = await groqRes.json();
            const command = JSON.parse(groqData.choices[0].message.content);

            setStatusText("Executing...");

            // STEP 3: Execute the Parsed Command
            executeCommand(command);

        } catch (error) {
            console.error("Voice Processing Error:", error);
            const msg = error.message.substring(0, 45);
            setStatusText(`ERROR: ${msg}`);
        } finally {
            setIsProcessing(false);
        }
    };

    const playTTS = async (text, langCode = "hi-IN") => {
        try {
            const response = await fetch("https://api.sarvam.ai/text-to-speech/stream", {
                method: "POST",
                headers: {
                    "api-subscription-key": SARVAM_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text,
                    target_language_code: langCode,
                    speaker: "shubh",
                    model: "bulbul:v3",
                    pace: 1.1,
                    speech_sample_rate: 22050,
                    output_audio_codec: "mp3",
                    enable_preprocessing: true
                })
            });

            if (!response.ok) throw new Error("TTS failed");

            const chunks = [];
            const reader = response.body.getReader();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }

            const blob = new Blob(chunks, { type: "audio/mpeg" });
            const audio = new Audio(URL.createObjectURL(blob));
            audio.play();
        } catch (error) {
            console.error("TTS Error:", error);
        }
    };

    const executeCommand = (command) => {
        if (!command || !command.action) {
            setStatusText("Unknown command.");
            return;
        }

        const uiText = command.reply || "Done!";
        const lang = command.languageCode || "hi-IN";

        switch (command.action) {
            case 'setYear':
                if (command.year) setCurrentYear(command.year);
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            case 'collapseGovt':
                if (command.stateCode && command.year) {
                    setCurrentYear(command.year);
                    updateScenario({ reelectionMode: 'custom' });
                    triggerReelection(command.stateCode, command.year);
                }
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            case 'setPreset':
                if (command.preset === 'ideal') {
                    updateScenario({ governmentCollapseProbability: 0, securityPhaseCount: 5, includeLocalBodies: true });
                } else if (command.preset === 'real') {
                    updateScenario({ governmentCollapseProbability: 0.1, securityPhaseCount: 3, includeLocalBodies: false });
                } else if (command.preset === 'chaos') {
                    updateScenario({ governmentCollapseProbability: 0.4, securityPhaseCount: 1, includeLocalBodies: true });
                }
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            case 'adjustSlider':
                if (command.slider === 'collapseProbability' && command.value !== undefined) {
                    updateScenario({ governmentCollapseProbability: Math.min(1, Math.max(0, command.value)) });
                } else if (command.slider === 'securityPhases' && command.value !== undefined) {
                    updateScenario({ securityPhaseCount: Math.min(7, Math.max(1, command.value)) });
                }
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            case 'toggleLocalBodies':
                updateScenario({ includeLocalBodies: !!command.value });
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            case 'stressTest': {
                const stressUpdates = { ...scenario.testSimulation, active: command.active !== false };
                if (command.budgetCap) stressUpdates.budgetCap = command.budgetCap;
                if (command.securityCap) stressUpdates.securityCap = command.securityCap;
                if (command.staffCap) stressUpdates.staffCap = command.staffCap;
                updateScenario({ testSimulation: stressUpdates });
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;
            }

            case 'resetAll':
                resetScenario();
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            case 'getInfo':
                setStatusText(uiText);
                playTTS(uiText, lang);
                break;

            default:
                setStatusText(uiText);
                if (command.reply) playTTS(command.reply, lang);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[200] font-sans">
            {/* Expanded Interface */}
            {isOpen && (
                <div className="mb-4 w-72 bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center bg-slate-800 border-b border-slate-700">
                        <div className="flex items-center gap-2 text-indigo-400">
                            <Sparkles size={16} />
                            <h3 className="font-bold text-sm tracking-widest uppercase">Director AI</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">

                        {/* Audio Ring Vfx */}
                        {isRecording && (
                            <div className="absolute inset-0 flex items-center justify-center z-0">
                                <span className="absolute w-24 h-24 rounded-full bg-indigo-500/20 animate-ping"></span>
                                <span className="absolute w-32 h-32 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDelay: '0.2s' }}></span>
                            </div>
                        )}

                        <button
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onMouseLeave={stopRecording}
                            onTouchStart={startRecording}
                            onTouchEnd={stopRecording}
                            disabled={isProcessing}
                            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all ${isProcessing ? 'bg-slate-700 text-slate-500 cursor-not-allowed' :
                                isRecording ? 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.5)] scale-110' :
                                    'bg-slate-800 text-indigo-400 hover:bg-slate-700 hover:scale-105 border border-slate-700 cursor-pointer'
                                }`}
                        >
                            {isProcessing ? <Loader2 size={32} className="animate-spin" /> : <Mic size={32} />}
                        </button>

                        <p className="mt-6 text-xs text-center font-bold text-slate-300 uppercase tracking-widest">
                            {isRecording ? "Listening..." : statusText}
                        </p>

                        {transcript && !isRecording && (
                            <p className="mt-4 text-xs text-center text-slate-400 italic px-2 bg-slate-900/50 rounded py-2 border border-slate-800">
                                "{transcript}"
                            </p>
                        )}

                        {!isRecording && !isProcessing && !transcript && (
                            <span className="text-[9px] text-slate-500 mt-2 uppercase tracking-widest text-center mt-4 border border-slate-700 px-2 py-1 rounded">
                                Hold to Speak
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Minimized Bubble */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-slate-900 text-indigo-400 rounded-full shadow-2xl border border-slate-700 flex items-center justify-center hover:scale-110 transition-transform group relative"
                >
                    <Mic size={24} />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                    </span>
                    <span className="absolute left-16 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Voice Director
                    </span>
                </button>
            )}
        </div>
    );
}
