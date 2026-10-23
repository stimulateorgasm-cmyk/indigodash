/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Zap,
  HeartPulse,
  Activity,
  AlertTriangle,
  Clock,
  Sparkles,
  Calculator,
  ArrowRight,
  X,
  Download,
  ExternalLink,
  UserCheck,
  HelpCircle,
  Briefcase,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  TEAM_MEMBERS,
  BUSINESS_STATS,
  PSYCHOLOGISTS,
  Employee,
  RiskZone
} from './data/teamData';

export default function App() {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [activeModalEmployee, setActiveModalEmployee] = useState<Employee | null>(null);
  const [modalChartLayer, setModalChartLayer] = useState<'both' | 'energy' | 'stress'>('both');
  const [calcEnergy, setCalcEnergy] = useState<number>(7.5);
  const [calcStress, setCalcStress] = useState<number>(4.0);
  const [calcPositivity, setCalcPositivity] = useState<number>(70);
  const [compareMetric, setCompareMetric] = useState<'both' | 'energy' | 'stress'>('both');
  const [showTrafficLightGuide, setShowTrafficLightGuide] = useState<boolean>(true);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    if (selectedZone === 'all') return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter((emp) => emp.finalZone === selectedZone);
  }, [selectedZone]);

  // Calculator formula: (Energy + (10 - Stress) + Positivity * 10) / 3
  const calculatedIndex = useMemo(() => {
    const posComponent = (calcPositivity / 100) * 10;
    const score = (calcEnergy + (10 - calcStress) + posComponent) / 3;
    return Number(score.toFixed(1));
  }, [calcEnergy, calcStress, calcPositivity]);

  const calcZoneStatus = useMemo(() => {
    if (calculatedIndex >= 6.0) {
      return {
        label: 'В ресурсе (Зелёная зона)',
        detail: 'Высокая продуктивность, готовность к сложным звонкам',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      };
    }
    if (calculatedIndex >= 4.5) {
      return {
        label: 'Зона внимания / Стабилизация (Жёлтая)',
        detail: 'Рабочий тонус есть, но требуется поддерживающий контроль',
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      };
    }
    return {
      label: 'Критический риск выгорания (Красная)',
      detail: 'Острая перегрузка, апатия, угроза срыва сделок и увольнения',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    };
  }, [calculatedIndex]);

  const getZoneBadge = (zone: RiskZone) => {
    switch (zone) {
      case 'green':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            В ресурсе
          </span>
        );
      case 'yellow':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Стабилизация
          </span>
        );
      case 'red':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_16px_rgba(244,63,94,0.35)]">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Критический риск
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/40">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Замеры собираются
          </span>
        );
    }
  };

  return (
    <div className="nebula-bg min-h-screen text-slate-100 pb-24">
      {/* 1. Header with decoupled branding & no clutter */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#13102a]/85 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand & Client zone */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Logo lockup with clear spacing and separated descriptor */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7c3aed] to-[#d94fa3] flex items-center justify-center font-extrabold text-white text-lg shadow-[0_0_22px_rgba(217,79,163,0.5)] ring-1 ring-white/20 shrink-0">
                IL
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-pink-100 to-[#f0a3c8] bg-clip-text text-transparent leading-none">
                  Indigo Lab
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-[0.16em] uppercase mt-1">
                  Корпоративная психология
                </span>
              </div>
            </div>

            <div className="hidden md:block h-7 w-px bg-white/15" />

            {/* Monitored client badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block leading-tight">
                  Школа дизайна
                </span>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Отдел продаж · 4 менеджера + 1 РОП
                </span>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              <span>Пилот: 5 сессий / сотрудника</span>
            </div>

            <a
              href="/index-dashboard.html"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 hover:from-violet-600/50 hover:to-fuchsia-600/50 text-slate-100 hover:text-white border border-fuchsia-500/35 transition-all shadow-[0_0_15px_rgba(217,79,163,0.25)]"
              title="Открыть или скачать самодостаточный HTML файл"
            >
              <Download className="w-3.5 h-3.5 text-pink-300" />
              <span className="hidden sm:inline">Автономный</span> HTML
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Introduction */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Дашборд руководителя · Реальные данные пилотного кейса
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Состояние команды
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Психологи Indigo Lab работают с сотрудниками онлайн, а руководитель в реальном времени видит
                бизнес-эффект: люди меньше выгорают, стабильно звонят клиентам, не увольняются и приносят больше денег.
              </p>
            </div>

            <button
              onClick={() => setShowTrafficLightGuide(!showTrafficLightGuide)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors self-start md:self-end"
            >
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showTrafficLightGuide ? 'Скрыть расшифровку зон' : 'Что значат зоны риска?'}</span>
            </button>
          </div>
        </div>

        {/* 2. Traffic Light Explanation Banner for Executives */}
        {showTrafficLightGuide && (
          <div className="glass-card rounded-2xl p-5 mb-8 border-violet-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                Светофор психологического риска (что это значит для руководителя):
              </h3>
              <span className="text-xs text-slate-400">Шкала индекса 0–10</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="font-bold text-emerald-300 text-sm">Зелёная зона («В ресурсе»)</span>
                </div>
                <div className="text-slate-300 leading-relaxed">
                  <strong>Индекс 6.0–10:</strong> Высокая продуктивность, способность выдерживать возражения клиентов, нулевой риск увольнения. Человек готов к перевыполнению плана.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                  <span className="font-bold text-amber-300 text-sm">Жёлтая зона («Стабилизация»)</span>
                </div>
                <div className="text-slate-300 leading-relaxed">
                  <strong>Индекс 4.5–5.9:</strong> Период повышенной нагрузки или восстановления после глубокого стресса. Рабочий тонус есть, но нужен поддерживающий психологический фокус.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
                  <span className="font-bold text-rose-300 text-sm">Красная зона («Критический риск»)</span>
                </div>
                <div className="text-slate-300 leading-relaxed">
                  <strong>Индекс 0–4.4:</strong> Астения, истощение, страх звонков, слив лидов. Высокая угроза увольнения в течение 1–2 недель. Требуется срочная супервизия.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Upper Business KPI Row */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-400" />
              Эффект для бизнеса (Итоги пилота в Школе дизайна)
            </h2>
            <span className="text-xs text-slate-400">Данные 5 сессий</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1 */}
            <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Стресс = Риск потери кадров</span>
                <TrendingDown className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight text-glow-cyan">
                {BUSINESS_STATS.stressReduction}
              </div>
              <div className="mt-1 text-sm font-bold text-white">Стресс команды снизился</div>
              <p className="mt-1.5 text-xs text-slate-300 leading-snug">
                {BUSINESS_STATS.stressDetail}. Устранён риск срыва ключевых продавцов перед закрытием месяца.
              </p>
            </div>

            {/* KPI 2 */}
            <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-400" />
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Энергия = Продуктивность</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono tracking-tight text-glow-cyan">
                {BUSINESS_STATS.energyGrowth}
              </div>
              <div className="mt-1 text-sm font-bold text-white">Энергия выросла на +37%</div>
              <p className="mt-1.5 text-xs text-slate-300 leading-snug">
                Готовность выдерживать отказы клиентов, совершать 30+ звонков в день и дожимать зависшие чеки.
              </p>
            </div>

            {/* KPI 3 */}
            <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-400" />
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Удержание сотрудников</span>
                <ShieldCheck className="w-4 h-4 text-pink-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-pink-300 font-mono tracking-tight text-glow-magenta">
                {BUSINESS_STATS.churnCount}
              </div>
              <div className="mt-1 text-sm font-bold text-white">100% сохранение штата</div>
              <p className="mt-1.5 text-xs text-slate-300 leading-snug">
                Спасён менеджер из глубокого кризиса (энергия 2/10). Экономия от 350 000 ₽ на замене и простое.
              </p>
            </div>

            {/* KPI 4 */}
            <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-400" />
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Ресурсная готовность</span>
                <UserCheck className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-300 font-mono tracking-tight text-glow-indigo">
                {BUSINESS_STATS.greenZoneShare}
              </div>
              <div className="mt-1 text-sm font-bold text-white">80% команды вне риска</div>
              <p className="mt-1.5 text-xs text-slate-300 leading-snug">
                {BUSINESS_STATS.greenZoneDetail}. Отдел готов к повышению конверсий и масштабированию.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Filter tabs & Formula Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
            <button
              onClick={() => setSelectedZone('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedZone === 'all'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Все сотрудники ({TEAM_MEMBERS.length})
            </button>
            <button
              onClick={() => setSelectedZone('green')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedZone === 'green'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              В ресурсе (3)
            </button>
            <button
              onClick={() => setSelectedZone('yellow')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedZone === 'yellow'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              Стабилизация (1)
            </button>
            <button
              onClick={() => setSelectedZone('pending')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedZone === 'pending'
                  ? 'bg-slate-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Замеры собираются (1)
            </button>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-slate-300 font-mono">
            <HelpCircle className="w-4 h-4 text-pink-400 shrink-0" />
            <span className="text-slate-400 hidden sm:inline">Формула:</span>
            <span className="font-semibold text-white">Индекс = (Энергия + (10 − Стресс) + Позитив×10) / 3</span>
          </div>
        </div>

        {/* 5. Center — Cards Grid with High-Legibility Typography & Clear Sparklines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredEmployees.map((emp) => {
            const hasData = !emp.isPending && emp.points.length > 0;
            const initials = emp.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={emp.id}
                onClick={() => {
                  setActiveModalEmployee(emp);
                  setModalChartLayer('both');
                }}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:-translate-y-1 transition-all group"
              >
                <div>
                  {/* Card top */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${
                          emp.psychologist.avatarColor || 'from-violet-600 to-pink-600'
                        } flex items-center justify-center font-extrabold text-white text-lg shadow-md ring-1 ring-white/20 shrink-0`}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg text-white group-hover:text-pink-300 transition-colors truncate">
                          {emp.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium truncate">{emp.role}</p>
                      </div>
                    </div>
                    {getZoneBadge(emp.finalZone)}
                  </div>

                  {/* Psychologist & sessions count */}
                  <div className="mb-4 px-3.5 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-200">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-slate-400">Психолог:</span>
                      <strong className="text-white truncate font-semibold">{emp.psychologist.name}</strong>
                    </div>
                    <span className="text-violet-300 font-bold shrink-0 ml-2">
                      {emp.sessionsCount} {emp.isPending ? 'вводная' : 'сессий'}
                    </span>
                  </div>

                  {hasData ? (
                    <>
                      {/* Happiness Index Hero Banner */}
                      <div className="mb-4 p-3.5 rounded-xl bg-gradient-to-r from-violet-600/25 via-fuchsia-600/20 to-pink-600/25 border border-fuchsia-500/35 flex items-center justify-between shadow-inner">
                        <div>
                          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                            Индекс счастья (ресурс)
                          </div>
                          <div className="text-xs text-slate-300 mt-0.5">
                            Старт <strong className="text-white">{emp.startHappinessIndex?.toFixed(1)}</strong> ➔ Финал{' '}
                            <strong className="text-white">{emp.finalHappinessIndex?.toFixed(1)}</strong>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono text-glow-magenta leading-none flex items-baseline justify-end gap-1">
                            {emp.finalHappinessIndex?.toFixed(1)}
                            <span className="text-xs text-slate-400 font-normal">/10</span>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 mt-1 inline-block">
                            +{emp.happinessDeltaPercent}% к старту
                          </span>
                        </div>
                      </div>

                      {/* Energy & Stress Detailed Metric Blocks */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Energy */}
                        <div className="p-3 rounded-xl bg-[#13102a]/70 border border-white/10">
                          <div className="text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                            <span className="text-cyan-300">Энергия (тонус)</span>
                            <Zap className="w-3.5 h-3.5 text-cyan-400" />
                          </div>
                          <div className="text-base sm:text-lg font-extrabold font-mono text-white flex items-center gap-1.5">
                            <span className="text-slate-400">{emp.startEnergy}</span>
                            <span className="text-cyan-400 text-sm">➔</span>
                            <span className="text-cyan-300">{emp.finalEnergy}</span>
                          </div>
                          <div className="text-xs font-bold text-emerald-400 mt-1">
                            {emp.energyDeltaPercent !== 0 ? `+${emp.energyDeltaPercent}% продуктивности` : 'стабильно высокий'}
                          </div>
                        </div>

                        {/* Stress */}
                        <div className="p-3 rounded-xl bg-[#13102a]/70 border border-white/10">
                          <div className="text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                            <span className="text-rose-300">Стресс (выгорание)</span>
                            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                          </div>
                          <div className="text-base sm:text-lg font-extrabold font-mono text-white flex items-center gap-1.5">
                            <span className="text-slate-400">{emp.startStress}</span>
                            <span className="text-rose-400 text-sm">➔</span>
                            <span className="text-emerald-400">{emp.finalStress}</span>
                          </div>
                          <div className="text-xs font-bold text-emerald-400 mt-1">
                            {emp.stressDeltaPercent}% риска потери
                          </div>
                        </div>
                      </div>

                      {/* Visual Sparkline with Explicit Point Values & Legend */}
                      <div className="mb-4 p-3 bg-white/[0.03] rounded-xl border border-white/5">
                        <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                          <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" /> Энергия ({emp.startEnergy} ➔ {emp.finalEnergy})
                          </span>
                          <span className="text-rose-400 flex items-center gap-1 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-rose-400" /> Стресс ({emp.startStress} ➔ {emp.finalStress})
                          </span>
                        </div>

                        <div className="h-14 w-full relative">
                          <svg className="w-full h-14 overflow-visible" viewBox="0 0 260 48">
                            {/* Horizontal guide lines */}
                            <line x1="10" y1="8" x2="250" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="10" y1="40" x2="250" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />

                            {/* Energy sparkline line */}
                            {emp.points.length > 1 && (
                              <path
                                d={emp.points
                                  .map((p, i) => {
                                    const x = 16 + (i / (emp.points.length - 1)) * 228;
                                    const y = 42 - (p.energy / 10) * 36;
                                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                  })
                                  .join(' ')}
                                fill="none"
                                stroke="#38bdf8"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            )}

                            {/* Stress sparkline line */}
                            {emp.points.length > 1 && (
                              <path
                                d={emp.points
                                  .map((p, i) => {
                                    const x = 16 + (i / (emp.points.length - 1)) * 228;
                                    const y = 42 - (p.stress / 10) * 36;
                                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                                  })
                                  .join(' ')}
                                fill="none"
                                stroke="#f43f5e"
                                strokeWidth="2.5"
                                strokeDasharray="4 3"
                                strokeLinecap="round"
                              />
                            )}

                            {/* Point circles & explicit values */}
                            {emp.points.map((p, i) => {
                              const x = 16 + (i / (emp.points.length - 1)) * 228;
                              const yE = 42 - (p.energy / 10) * 36;
                              const yS = 42 - (p.stress / 10) * 36;
                              const isStartOrEnd = i === 0 || i === emp.points.length - 1;

                              return (
                                <g key={i}>
                                  <circle cx={x} cy={yE} r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                                  <circle cx={x} cy={yS} r="3.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                                  {isStartOrEnd && (
                                    <>
                                      <text x={x} y={yE - 6} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                        {p.energy}
                                      </text>
                                      <text x={x} y={yS + 12} fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                        {p.stress}
                                      </text>
                                    </>
                                  )}
                                </g>
                              );
                            })}
                          </svg>
                        </div>

                        {/* Timeline point names below sparkline */}
                        <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                          <span>Старт ({emp.points[0]?.date || 'Диагностика'})</span>
                          {emp.points.length > 2 && <span>Середина</span>}
                          <span>Финал ({emp.points[emp.points.length - 1]?.date || 'Сессия 5'})</span>
                        </div>
                      </div>

                      {/* Executive summary highlight */}
                      <div className="text-xs text-slate-200 bg-white/5 p-3 rounded-xl mb-4 border-l-3 border-fuchsia-400 leading-relaxed">
                        <strong className="text-pink-300 block mb-1">Вывод для руководителя:</strong>
                        {emp.businessImpact.executiveSummary}
                      </div>
                    </>
                  ) : (
                    /* Pending State */
                    <div className="py-8 px-4 bg-white/[0.03] rounded-xl border border-dashed border-white/10 text-center mb-4">
                      <Clock className="w-9 h-9 text-slate-400 mx-auto mb-2.5" />
                      <div className="text-base font-bold text-white">Замеры собираются</div>
                      <p className="text-xs text-slate-300 mt-1.5 max-w-xs mx-auto leading-relaxed">
                        Сотрудник проходит вводные диагностические сессии. Формируется персональная карта факторов перегрузки.
                      </p>
                      <div className="mt-3 inline-block px-3 py-1 rounded-md bg-white/5 text-xs text-cyan-300 font-medium">
                        Реальный аудит · Цифры появятся после 1-й контрольной точки
                      </div>
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-violet-600/25 hover:bg-violet-600/45 text-slate-100 hover:text-white border border-violet-500/35 text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:border-pink-500/50"
                >
                  <span>{hasData ? 'Открыть историю замеров и аналитику' : 'Подробнее о сотруднике'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* 6. Section — «Почему это важно бизнесу» */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Zap className="w-6 h-6 text-pink-400" />
              Почему это критично для бизнеса
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              Психологическая поддержка в Indigo Lab напрямую конвертируется в финансовые показатели отдела продаж:
              снятие стресса освобождает ресурс, который раньше тратился на подавление тревоги.
            </p>
          </div>

          {/* Value Chain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            <div className="glass-card rounded-2xl p-5 relative">
              <div className="text-xs font-extrabold text-pink-400 font-mono mb-1.5">ШАГ 1</div>
              <div className="text-base font-bold text-white mb-1.5">Меньше стресса</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Снимается сковывающий страх отказов клиентов и эмоциональное истощение перед звонками.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 relative">
              <div className="text-xs font-extrabold text-pink-400 font-mono mb-1.5">ШАГ 2</div>
              <div className="text-base font-bold text-white mb-1.5">Больше энергии</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Появляется рабочий ресурс: менеджеры делают на 20–30% больше качественных повторных касаний.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 relative">
              <div className="text-xs font-extrabold text-pink-400 font-mono mb-1.5">ШАГ 3</div>
              <div className="text-base font-bold text-white mb-1.5">Больше сделок</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Клиенты чувствуют уверенность менеджера, конверсия из лида в оплату вырастает.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 relative">
              <div className="text-xs font-extrabold text-pink-400 font-mono mb-1.5">ШАГ 4</div>
              <div className="text-base font-bold text-white mb-1.5">0 увольнений</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Компания не теряет опытных продавцов и экономит от 350 000 ₽ на замене каждого человека.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-5 relative border-pink-500/40 bg-gradient-to-br from-violet-950/50 to-fuchsia-950/50 shadow-[0_0_25px_rgba(217,79,163,0.25)]">
              <div className="text-xs font-extrabold text-emerald-400 font-mono mb-1.5">РЕЗУЛЬТАТ</div>
              <div className="text-base font-bold text-emerald-300 mb-1.5">Рост прибыли</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Отдел стабильно делает план, а РОП освобождён от тушения эмоциональных пожаров.
              </p>
            </div>
          </div>

          {/* Comparative Team Progress */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Сводная динамика команды: Старт vs Финал
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Реальные замеры 4 сотрудников, прошедших полный курс 5 сессий
                </p>
              </div>

              {/* Segmented metric selector */}
              <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl text-xs">
                <button
                  onClick={() => setCompareMetric('both')}
                  className={`px-3.5 py-1.5 font-bold rounded-lg transition-all ${
                    compareMetric === 'both' ? 'bg-violet-600 text-white shadow' : 'text-slate-400'
                  }`}
                >
                  Все показатели
                </button>
                <button
                  onClick={() => setCompareMetric('energy')}
                  className={`px-3.5 py-1.5 font-bold rounded-lg transition-all ${
                    compareMetric === 'energy' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400'
                  }`}
                >
                  Энергия (рост)
                </button>
                <button
                  onClick={() => setCompareMetric('stress')}
                  className={`px-3.5 py-1.5 font-bold rounded-lg transition-all ${
                    compareMetric === 'stress' ? 'bg-rose-600 text-white shadow' : 'text-slate-400'
                  }`}
                >
                  Стресс (спад)
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {TEAM_MEMBERS.filter((e) => !e.isPending).map((emp) => (
                <div key={emp.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-base text-white">{emp.name}</span>
                      <span className="text-xs text-slate-400">({emp.role})</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-pink-300">
                      Индекс: {emp.startHappinessIndex?.toFixed(1)} ➔ {emp.finalHappinessIndex?.toFixed(1)} (+{emp.happinessDeltaPercent}%)
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    {/* Energy Bar */}
                    {(compareMetric === 'both' || compareMetric === 'energy') && (
                      <div>
                        <div className="flex justify-between text-xs mb-1.5 text-slate-300 font-sans">
                          <span className="text-cyan-400 font-bold">
                            Энергия: {emp.startEnergy} ➔ {emp.finalEnergy}
                          </span>
                          <span className="text-emerald-400 font-bold font-mono">
                            {emp.energyDeltaPercent !== 0 ? `+${emp.energyDeltaPercent}%` : 'стабильно'}
                          </span>
                        </div>
                        <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: `${((emp.startEnergy || 0) / 10) * 100}%` }}
                            className="bg-cyan-600/50 h-full"
                          />
                          <div
                            style={{
                              width: `${Math.max(
                                0,
                                (((emp.finalEnergy || 0) - (emp.startEnergy || 0)) / 10) * 100
                              )}%`,
                            }}
                            className="bg-cyan-400 h-full shadow-[0_0_10px_#22d3ee]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Stress Bar */}
                    {(compareMetric === 'both' || compareMetric === 'stress') && (
                      <div>
                        <div className="flex justify-between text-xs mb-1.5 text-slate-300 font-sans">
                          <span className="text-rose-400 font-bold">
                            Стресс: {emp.startStress} ➔ {emp.finalStress}
                          </span>
                          <span className="text-emerald-400 font-bold font-mono">{emp.stressDeltaPercent}%</span>
                        </div>
                        <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: `${((emp.finalStress || 0) / 10) * 100}%` }}
                            className="bg-emerald-500 h-full"
                          />
                          <div
                            style={{
                              width: `${Math.max(
                                0,
                                (((emp.startStress || 0) - (emp.finalStress || 0)) / 10) * 100
                              )}%`,
                            }}
                            className="bg-rose-500/60 h-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Calculator Block */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 mb-10 border-violet-500/30">
            <div className="flex items-center gap-2.5 mb-2">
              <Calculator className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Интерактивный калькулятор Индекса счастья
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-2xl leading-relaxed">
              Рассчитайте индекс сотрудника по корпоративной формуле Indigo Lab:{' '}
              <code className="text-pink-300 font-mono bg-white/5 px-2 py-0.5 rounded">
                (Энергия + (10 − Стресс) + Позитив × 10) / 3
              </code>
              . Передвигайте бегунки для симуляции различных рабочих состояний.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Энергия (продуктивность)</span>
                  <span className="text-cyan-400 font-mono">{calcEnergy.toFixed(1)} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={calcEnergy}
                  onChange={(e) => setCalcEnergy(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">Способность закрывать задачи</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Стресс (риск выгорания)</span>
                  <span className="text-rose-400 font-mono">{calcStress.toFixed(1)} / 10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={calcStress}
                  onChange={(e) => setCalcStress(parseFloat(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">Уровень внутреннего истощения</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Позитивный фон</span>
                  <span className="text-emerald-400 font-mono">{calcPositivity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={calcPositivity}
                  onChange={(e) => setCalcPositivity(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">Оптимизм и вера в результат</div>
              </div>

              {/* Result card */}
              <div className="p-4 rounded-2xl bg-[#13102a]/80 border border-fuchsia-500/35 text-center shadow-lg">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Индекс счастья
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono text-glow-magenta mb-2">
                  {calculatedIndex} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                </div>
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${calcZoneStatus.color}`}>
                  {calcZoneStatus.label}
                </span>
                <div className="text-[11px] text-slate-400 mt-2 leading-tight">
                  {calcZoneStatus.detail}
                </div>
              </div>
            </div>
          </div>

          {/* Psychologists Profiles */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Команда психологов Indigo Lab в проекте «Школа дизайна»
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-4">
              Эксперты подобраны персонально под задачи каждого участника отдела продаж
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PSYCHOLOGISTS.map((psy, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-base text-white">{psy.name}</h4>
                    <span className="text-xs text-violet-300 font-semibold">{psy.experience}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{psy.focus}</div>
                </div>
                <div className="pt-3 border-t border-white/5 text-xs text-cyan-300 flex items-center gap-2 font-medium">
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>{psy.assignedClient}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 pt-8 pb-12 text-center text-xs sm:text-sm text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 flex items-center justify-center font-bold text-white text-xs">
              IL
            </div>
            <span className="font-bold text-slate-200">Indigo Lab · Корпоративная психология</span>
          </div>

          <div>
            Образец сервиса для руководителей компаний ·{' '}
            <a
              href="https://b2b.indigolab.pro"
              target="_blank"
              rel="noreferrer"
              className="text-pink-400 hover:text-pink-300 underline inline-flex items-center gap-1 font-semibold"
            >
              b2b.indigolab.pro <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <a
              href="/index-dashboard.html"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white underline font-medium"
            >
              Скачать HTML-файл прототипа
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modal Dialog */}
      {activeModalEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0819]/85 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalEmployee(null)}
        >
          <div
            className="glass-card-interactive rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalEmployee(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-start justify-between gap-4 mb-6 pr-8">
              <div>
                <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeModalEmployee.name}
                  </h2>
                  {getZoneBadge(activeModalEmployee.finalZone)}
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {activeModalEmployee.role} · Психолог:{' '}
                  <strong className="text-white font-semibold">{activeModalEmployee.psychologist.name}</strong> ·{' '}
                  {activeModalEmployee.sessionsCount} сессий
                </p>
              </div>
            </div>

            {/* Measurements Chart & Table */}
            {activeModalEmployee.points && activeModalEmployee.points.length > 0 ? (
              <>
                {/* SVG Line Chart in Modal */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#13102a]/80 border border-white/10 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-sm font-bold text-white block">Динамика по контрольным точкам</span>
                      <span className="text-xs text-slate-400">Шкала 0–10 (чем выше энергия и ниже стресс — тем лучше)</span>
                    </div>

                    {/* Chart layer filters */}
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg text-xs font-medium">
                      <button
                        onClick={() => setModalChartLayer('both')}
                        className={`px-2.5 py-1 rounded ${
                          modalChartLayer === 'both' ? 'bg-violet-600 text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        Оба
                      </button>
                      <button
                        onClick={() => setModalChartLayer('energy')}
                        className={`px-2.5 py-1 rounded ${
                          modalChartLayer === 'energy' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        Энергия
                      </button>
                      <button
                        onClick={() => setModalChartLayer('stress')}
                        className={`px-2.5 py-1 rounded ${
                          modalChartLayer === 'stress' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        Стресс
                      </button>
                    </div>
                  </div>

                  <div className="h-52 w-full relative">
                    <svg className="w-full h-52 overflow-visible" viewBox="0 0 440 160">
                      {/* Grid lines */}
                      {[0, 2.5, 5, 7.5, 10].map((val, idx) => {
                        const y = 130 - (val / 10) * 110;
                        return (
                          <g key={idx}>
                            <line x1="35" y1={y} x2="425" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                            <text x="8" y={y + 3} fill="#64748b" fontSize="10" fontFamily="monospace">
                              {val}
                            </text>
                          </g>
                        );
                      })}

                      {/* Energy path */}
                      {(modalChartLayer === 'both' || modalChartLayer === 'energy') && (
                        <path
                          d={activeModalEmployee.points
                            .map((p, i) => {
                              const x = 55 + (i / (activeModalEmployee.points.length - 1)) * 350;
                              const y = 130 - (p.energy / 10) * 110;
                              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                            })
                            .join(' ')}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Stress path */}
                      {(modalChartLayer === 'both' || modalChartLayer === 'stress') && (
                        <path
                          d={activeModalEmployee.points
                            .map((p, i) => {
                              const x = 55 + (i / (activeModalEmployee.points.length - 1)) * 350;
                              const y = 130 - (p.stress / 10) * 110;
                              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                            })
                            .join(' ')}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="3"
                          strokeDasharray="5 4"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Data dots with tooltips/labels */}
                      {activeModalEmployee.points.map((p, i) => {
                        const x = 55 + (i / (activeModalEmployee.points.length - 1)) * 350;
                        const yE = 130 - (p.energy / 10) * 110;
                        const yS = 130 - (p.stress / 10) * 110;

                        return (
                          <g key={i}>
                            {/* Point E */}
                            {(modalChartLayer === 'both' || modalChartLayer === 'energy') && (
                              <>
                                <circle cx={x} cy={yE} r="5.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                                <text x={x} y={yE - 9} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                  {p.energy}
                                </text>
                              </>
                            )}

                            {/* Point S */}
                            {(modalChartLayer === 'both' || modalChartLayer === 'stress') && (
                              <>
                                <circle cx={x} cy={yS} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                                <text x={x} y={yS + 16} fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                                  {p.stress}
                                </text>
                              </>
                            )}

                            {/* X label */}
                            <text x={x} y="152" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                              {p.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* History Table */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    История контрольных точек
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-white/5">
                        <tr className="border-b border-white/10 text-slate-300 uppercase text-[11px]">
                          <th className="py-2.5 px-3">Точка</th>
                          <th className="py-2.5 px-3">Дата</th>
                          <th className="py-2.5 px-3 text-cyan-400">Энергия</th>
                          <th className="py-2.5 px-3 text-rose-400">Стресс</th>
                          <th className="py-2.5 px-3">Позитив</th>
                          <th className="py-2.5 px-3 text-pink-300">Индекс счастья</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono">
                        {activeModalEmployee.points.map((pt, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.03]">
                            <td className="py-2.5 px-3 font-semibold text-white font-sans">{pt.label}</td>
                            <td className="py-2.5 px-3 text-slate-400 font-sans">{pt.date || '—'}</td>
                            <td className="py-2.5 px-3 font-bold text-cyan-300">{pt.energy}</td>
                            <td className="py-2.5 px-3 font-bold text-rose-300">{pt.stress}</td>
                            <td className="py-2.5 px-3 text-slate-300">{pt.positivityPercent}%</td>
                            <td className="py-2.5 px-3 font-bold text-pink-300">{pt.happinessIndex.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center bg-white/[0.03] rounded-2xl border border-white/10 mb-6">
                <Clock className="w-9 h-9 text-slate-400 mx-auto mb-2" />
                <div className="text-base font-bold text-white">Замеры собираются</div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto">
                  Сотрудник проходит вводные сессии диагностики. История и график будут заполнены по мере проведения замеров.
                </p>
              </div>
            )}

            {/* Business Impact Card */}
            <div className="p-5 rounded-2xl bg-violet-950/40 border border-violet-500/35">
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Состояние → Влияние на работу
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                {activeModalEmployee.businessImpact.executiveSummary}
              </p>

              <div className="space-y-2 mb-4">
                {activeModalEmployee.businessImpact.workEffect.map((item, i) => (
                  <div key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/30">
                Финансовый результат для компании: {activeModalEmployee.businessImpact.financialImpact}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
