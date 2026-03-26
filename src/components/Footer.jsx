import React from 'react';
import { Github, Database, FileText, Globe, Mail, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer({ onNavigate }) {
    const { t } = useLanguage();

    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-white tracking-tight">{t('title')}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {t('footerDesc')}
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://github.com/devGP7" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="mailto:gauravpatil232005@gmail.com" className="hover:text-white transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">{t('headingProject')}</h4>
                        <ul className="space-y-2 text-sm">

                            <li>
                                <a
                                    href="https://github.com/devGP7/h4final/blob/main/README.md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-indigo-400 transition-colors text-left"
                                >
                                    {t('linkSimLogic')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://drive.google.com/file/d/1FPnDbK6kiMBvuJSstZ-L-BFngyb7Hh_q/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    {t('documentation')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/devGP7/h4final"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-indigo-400 transition-colors"
                                >
                                    {t('linkSource')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Data Sources */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">{t('headingDataSources')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <FileText size={14} className="text-indigo-400" />
                                <a href="https://onoe.gov.in/HLC-Report-en" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                                    Kovind Committee
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Database size={14} className="text-indigo-400" />
                                <a href="https://www.kaggle.com/datasets/boomfire1omupadhyay/staff-budget-stateelection-50year" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                                    Expenses Data (State-wise)
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Shield size={14} className="text-indigo-400" />
                                <a href="https://www.kaggle.com/datasets/lennanlev/last-50-years-lok-sabha-election" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                                    Security & Staff Data
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div>
                        <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-wider">{t('disclaimer')}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {t('footerDisclaimerLong')}
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
