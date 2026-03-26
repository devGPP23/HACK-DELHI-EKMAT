
import React from 'react';
import { BookOpen, Scale, AlertTriangle, Gavel, FileText, CheckCircle2, ChevronRight, Info } from 'lucide-react';

const AmendmentSection = ({ number, title, content, children }) => {
    return (
        <div className="border border-slate-200 bg-white p-6 shadow-sm mb-6">
            <div className="flex items-base gap-3 mb-4">
                <span className="text-2xl font-bold text-indigo-900 opacity-20 select-none">{number}</span>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">{title}</h3>
                    <div className="h-0.5 w-12 bg-indigo-500 mt-2"></div>
                </div>
            </div>
            <div className="text-slate-600 space-y-4 text-justify leading-relaxed text-sm">
                {content}
                {children && <div className="mt-4 pt-4 border-t border-slate-100">{children}</div>}
            </div>
        </div>
    );
};

const KeyConcept = ({ title, description }) => (
    <div className="flex gap-4 items-start p-4 bg-slate-50 border-l-2 border-indigo-500">
        <div className="min-w-fit mt-1">
            <ChevronRight size={16} className="text-indigo-600" />
        </div>
        <div>
            <h4 className="text-sm font-bold text-slate-800 uppercase mb-1">{title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
        </div>
    </div>
);

export default function ConstitutionalImpact() {
    return (
        <section className="py-12 border-t border-slate-200 bg-white">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest border border-slate-200">
                        <Scale size={14} /> Legal Framework Analysis
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Constitutional Amendments for ONOE (2029)</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        Implementing "One Nation One Election" necessitates fundamental restructuring of India's electoral framework.
                        The High-Level Committee (Kovind Panel) has recommended <strong>15 distinct constitutional amendments</strong>.
                    </p>
                </div>

                {/* 1. Primary Amendments */}
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                        Core Constitutional Modifications
                    </h3>

                    <AmendmentSection
                        number="01"
                        title="New Article 82A"
                        content={<>
                            This proposed article establishes the foundational framework.
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700">
                                <li><strong>Clause 1:</strong> Empowers the President to notify an "Appointed Date" to bring ONOE provisions into force.</li>
                                <li><strong>Clause 2:</strong> Mandates that all State Assemblies elected after the appointed date will <strong>automatically dissolve</strong> with the Lok Sabha, ignoring individual 5-year guarantees.</li>
                                <li><strong>Clause 3:</strong> Introduces the "Unexpired Term" concept for mid-term dissolutions.</li>
                            </ul>
                        </>}
                    />

                    <AmendmentSection
                        number="02"
                        title="Article 83 & 172 (Duration of Houses)"
                        content="Redefines the 'Full Term' of Lok Sabha and State Assemblies to be 5 years. Crucially, it introduces the specific provision that a House reconstituted after premature dissolution shall continue only for the remainder of the period (Unexpired Term) and not a fresh 5-year tenure."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AmendmentSection
                            number="03"
                            title="Article 356 (President's Rule)"
                            content="Amended to ensure that dissolution of a State Assembly under President's Rule does not disrupt the synchronization. Any fresh election held after revocation of President's Rule will only be for the remainder of the cycle."
                        />
                        <AmendmentSection
                            number="04"
                            title="Article 324A (Local Bodies)"
                            content="Empowers Parliament to mandate simultaneous elections for Municipalities and Panchayats. These must act within 100 days of the General Election. (Requires ratification by 50% of States)."
                        />
                    </div>
                </div>

                {/* 2. Critical Concepts */}
                <div className="bg-slate-900 text-slate-300 p-8 shadow-sm">
                    <h3 className="text-white font-serif text-xl mb-6">Unique Legal Mechanisms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <KeyConcept
                            title="The Appointed Date"
                            description="A single Presidential notification that triggers the simultaneous cycle. Once issued, it curtails existing terms of all state assemblies to align with the next Lok Sabha term end."
                        />
                        <KeyConcept
                            title="Unexpired Term vs Full Term"
                            description="A fundamental shift: Elections held mid-term due to a hung assembly or collapse will NOT start a new 5-year clock. The new government serves only the remaining 'unexpired' balance of the term."
                        />
                        <KeyConcept
                            title="Super-Annual Terms"
                            description="If ONOE starts in June 2029, states elected in 2028 (e.g., Karnataka) may face dissolution in <1 year. This creates 'Sub-Annual Terms' scenarios not originally envisioned by the Constitution."
                        />
                        <KeyConcept
                            title="Constructive Vote of No Confidence"
                            description="(Proposed) To prevent frequent collapses, a No-Confidence Motion must differ from a simple one: it must be accompanied by a 'Confidence Motion' for an alternative leader."
                        />
                    </div>
                </div>

                {/* 3. Constitutional Impact & Challenges */}
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
                        Impact on Basic Structure & Federalism
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border border-slate-200 bg-red-50/30">
                            <h4 className="text-red-800 font-bold text-sm uppercase mb-2 flex items-center gap-2">
                                <AlertTriangle size={14} /> Federal Autonomy
                            </h4>
                            <p className="text-xs text-slate-700 text-justify">
                                Forced curtailment of State Assembly terms may violate the <strong>Basic Structure Doctrine</strong> (Federalism) established in <i>Keshavananda Bharati</i>. States lose the right to their own independent electoral cycles.
                            </p>
                        </div>

                        <div className="p-4 border border-slate-200 bg-amber-50/30">
                            <h4 className="text-amber-800 font-bold text-sm uppercase mb-2 flex items-center gap-2">
                                <Info size={14} /> Accountability Check
                            </h4>
                            <p className="text-xs text-slate-700 text-justify">
                                Fixed terms effectively dilute the <strong>'No Confidence'</strong> mechanism. Governments may become less accountable if mid-term elections are legally constrained or result in short 'unexpired' tenures.
                            </p>
                        </div>

                        <div className="p-4 border border-slate-200 bg-blue-50/30">
                            <h4 className="text-blue-800 font-bold text-sm uppercase mb-2 flex items-center gap-2">
                                <Gavel size={14} /> Presidential Powers
                            </h4>
                            <p className="text-xs text-slate-700 text-justify">
                                Enhanced powers for the President (Article 85) and Governors (Article 174) to manage dissolution could shift the balance of power from the Legislature to the Executive.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Conclusion */}
                <div className="bg-slate-50 border-t-4 border-indigo-600 p-6 text-center">
                    <h4 className="text-indigo-900 font-bold uppercase tracking-wider text-sm mb-2">Conclusion</h4>
                    <p className="text-slate-600 text-sm max-w-2xl mx-auto italic">
                        "The 2029 implementation requires comprehensive constitutional surgery. The most critical change—Article 82A—represents a departure from the principle that every election grants a fresh 5-year mandate, treating state cycles as subservient to the national calendar."
                    </p>
                </div>

            </div>
        </section>
    );
};
