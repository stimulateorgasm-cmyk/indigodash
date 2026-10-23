export interface MeasurementPoint {
  label: string;
  date?: string;
  energy: number; // 0 - 10
  stress: number; // 0 - 10
  positivityPercent: number; // e.g. 70 for 70%
  happinessIndex: number; // (energy + (10 - stress) + positivity * 10) / 3
}

export type RiskZone = 'green' | 'yellow' | 'red' | 'pending';

export interface Employee {
  id: string;
  name: string;
  role: string;
  psychologist: {
    name: string;
    specialty: string;
    avatarColor?: string;
  };
  sessionsCount: number;
  totalPlannedSessions?: number;
  isPending?: boolean;
  startZone: RiskZone;
  finalZone: RiskZone;
  points: MeasurementPoint[];
  startEnergy?: number;
  finalEnergy?: number;
  startStress?: number;
  finalStress?: number;
  startHappinessIndex?: number;
  finalHappinessIndex?: number;
  energyDeltaPercent?: number;
  stressDeltaPercent?: number;
  happinessDeltaPercent?: number;
  keyHighlight?: string;
  businessImpact: {
    executiveSummary: string;
    workEffect: string[];
    financialImpact: string;
  };
}

export const TEAM_MEMBERS: Employee[] = [
  {
    id: 'umka-samigatova',
    name: 'Умка Самигатова',
    role: 'Менеджер по продажам',
    psychologist: {
      name: 'Антон Шумкин',
      specialty: 'Преодоление эмоционального выгорания, стресс-менеджмент и личная продуктивность',
      avatarColor: 'from-violet-500 to-indigo-600',
    },
    sessionsCount: 5,
    totalPlannedSessions: 5,
    startZone: 'yellow',
    finalZone: 'green',
    startEnergy: 6.0,
    finalEnergy: 8.5,
    startStress: 6.0,
    finalStress: 2.0,
    startHappinessIndex: 5.0,
    finalHappinessIndex: 7.8,
    energyDeltaPercent: 42,
    stressDeltaPercent: -67,
    happinessDeltaPercent: 56,
    keyHighlight: 'Старт из жёлтой зоны → уверенный финал в зелёной. Стресс снизился в 3 раза!',
    points: [
      {
        label: 'Диагностика',
        date: 'Старт пилота',
        energy: 6.0,
        stress: 6.0,
        positivityPercent: 50,
        happinessIndex: 5.0,
      },
      {
        label: 'Сессия 3',
        date: 'Середина курса',
        energy: 8.0,
        stress: 6.0,
        positivityPercent: 60,
        happinessIndex: 6.0,
      },
      {
        label: 'Финал (Сессия 5)',
        date: 'Итог программы',
        energy: 8.5,
        stress: 2.0,
        positivityPercent: 70,
        happinessIndex: 7.8,
      },
    ],
    businessImpact: {
      executiveSummary: 'Полное снятие фоновой тревожности и страха упустить лида. Переход от пассивной обработки входящих к активным дожимам.',
      workEffect: [
        'Рост скорости обработки новых лидов на 24%',
        'Снятие прокрастинации перед сложными повторными звонками',
        'Эмоциональная устойчивость в конце рабочего дня без спада конверсии',
      ],
      financialImpact: 'Стабильное перевыполнение индивидуального плана продаж на 114% по итогам месяца.',
    },
  },
  {
    id: 'tatyana-ushcheka',
    name: 'Татьяна Ущека',
    role: 'Менеджер по продажам',
    psychologist: {
      name: 'Артём Ваксер',
      specialty: 'Гештальт-подход, преодоление страха отказов в B2B, баланс ресурсов нервной системы',
      avatarColor: 'from-fuchsia-500 to-rose-600',
    },
    sessionsCount: 5,
    totalPlannedSessions: 5,
    startZone: 'red',
    finalZone: 'green',
    startEnergy: 5.0,
    finalEnergy: 7.0,
    startStress: 7.5,
    finalStress: 5.0,
    startHappinessIndex: 3.5,
    finalHappinessIndex: 6.3,
    energyDeltaPercent: 40,
    stressDeltaPercent: -33,
    happinessDeltaPercent: 80,
    keyHighlight: 'Выход из красной зоны выгорания (стресс 7.5) в зелёную с устойчивым позитивом 70%.',
    points: [
      {
        label: 'Сессия 1',
        date: '26.01',
        energy: 5.0,
        stress: 7.5,
        positivityPercent: 30,
        happinessIndex: 3.5,
      },
      {
        label: 'Сессия 2',
        date: '10.02',
        energy: 6.0,
        stress: 5.0,
        positivityPercent: 70,
        happinessIndex: 6.0,
      },
      {
        label: 'Сессия 3',
        date: '16.02',
        energy: 7.0,
        stress: 3.0,
        positivityPercent: 80,
        happinessIndex: 7.3,
      },
      {
        label: 'Сессия 4',
        date: '25.02',
        energy: 8.0,
        stress: 5.0,
        positivityPercent: 80,
        happinessIndex: 7.0,
      },
      {
        label: 'Сессия 5',
        date: '16.03',
        energy: 7.0,
        stress: 4.0,
        positivityPercent: 75,
        happinessIndex: 6.8,
      },
      {
        label: 'Контроль',
        date: '25.03',
        energy: 7.0,
        stress: 5.0,
        positivityPercent: 70,
        happinessIndex: 6.3,
      },
    ],
    businessImpact: {
      executiveSummary: 'Сотрудник находился на этапе критической перегрузки и накопленного стресса (7.5/10), что грозило срывом и потерей клиентов. Восстановлен баланс и уверенность.',
      workEffect: [
        'Купирован страх конфликтов и отказов при переговорах с требовательными клиентами',
        'Увеличение среднего времени активных переговоров на 35 минут в день',
        'Разблокирована работа с отказной базой: реанимировано 4 крупных сделки',
      ],
      financialImpact: 'Предотвращён риск потери ключевого продавца и сохранено ~420 000 ₽ маржинальной выручки.',
    },
  },
  {
    id: 'madina-rop',
    name: 'Мадина',
    role: 'Руководитель отдела продаж (РОП)',
    psychologist: {
      name: 'Анна Ковалева',
      specialty: 'Бизнес-психолог, коучинг руководителей, антикризисное управление командами',
      avatarColor: 'from-cyan-500 to-blue-600',
    },
    sessionsCount: 5,
    totalPlannedSessions: 5,
    startZone: 'yellow',
    finalZone: 'green',
    startEnergy: 7.5,
    finalEnergy: 7.5,
    startStress: 6.5,
    finalStress: 5.0,
    startHappinessIndex: 5.0,
    finalHappinessIndex: 6.2,
    energyDeltaPercent: 0,
    stressDeltaPercent: -23,
    happinessDeltaPercent: 24,
    keyHighlight: 'Снижение стресса у РОПа с 6.5 до 5.0, баланс сместился с 40/60 в 60/40 в пользу позитива.',
    points: [
      {
        label: 'Точка А',
        date: 'Старт (баланс 40/60)',
        energy: 7.5,
        stress: 6.5,
        positivityPercent: 40,
        happinessIndex: 5.0,
      },
      {
        label: 'Точка Б',
        date: 'Итог (баланс 60/40)',
        energy: 7.5,
        stress: 5.0,
        positivityPercent: 60,
        happinessIndex: 6.2,
      },
    ],
    businessImpact: {
      executiveSummary: 'Высокая личная энергия РОПа сохранена, при этом снят избыточный стресс ответственности. Это оздоровило климат во всём отделе.',
      workEffect: [
        'Прекращение импульсивного микроменеджмента и тревожного контроля',
        'Переход к поддерживающей обратной связи на утренних планёрках',
        'Освобождение 6+ часов в неделю на разбор сложных кейсов и коучинг менеджеров',
      ],
      financialImpact: 'Снижение эмоциональной напряжённости в отделе повысило общую конверсию команды на 14%.',
    },
  },
  {
    id: 'selilovskaya',
    name: 'Селиловская',
    role: 'Менеджер по продажам',
    psychologist: {
      name: 'Индиго (Супервизор)',
      specialty: 'Клиническая супервизия, антикризисная реабилитация при астении и выгорании',
      avatarColor: 'from-amber-500 to-pink-600',
    },
    sessionsCount: 5,
    totalPlannedSessions: 5,
    startZone: 'red',
    finalZone: 'yellow',
    startEnergy: 2.0,
    finalEnergy: 5.0,
    startStress: 6.0,
    finalStress: 5.0,
    startHappinessIndex: 2.7,
    finalHappinessIndex: 5.0,
    energyDeltaPercent: 150,
    stressDeltaPercent: -17,
    happinessDeltaPercent: 85,
    keyHighlight: 'Главный кейс «до/после»: человек был на грани увольнения (энергия 2/10), выведена в устойчивый рабочий тонус!',
    points: [
      {
        label: 'Точка А',
        date: 'Глубокая красная зона',
        energy: 2.0,
        stress: 6.0,
        positivityPercent: 20,
        happinessIndex: 2.7,
      },
      {
        label: 'Точка Б',
        date: 'Рабочий тонус (Итог)',
        energy: 5.0,
        stress: 5.0,
        positivityPercent: 50,
        happinessIndex: 5.0,
      },
    ],
    businessImpact: {
      executiveSummary: 'Сотрудник находился на стадии полного эмоционального паралича и астении (энергия 2/10). Была реальная угроза увольнения в течение 1–2 недель.',
      workEffect: [
        'Энергия выросла в 2.5 раза (+150%), человек вернулся к регулярным звонкам',
        'Восстановлен нормальный сон и концентрация внимания в CRM',
        'Менеджер снова удерживает разговор с клиентом и закрывает сделки среднего чека',
      ],
      financialImpact: 'Прямое предотвращение увольнения: сохранено от 350 000 до 500 000 ₽ затрат на поиск, онбординг и простой рабочего места.',
    },
  },
  {
    id: 'pasechnaya-vera',
    name: 'Пасечная Вера',
    role: 'Менеджер по продажам',
    psychologist: {
      name: 'Эдгар Удрис',
      specialty: 'Когнитивно-поведенческий терапевт (CBT), диагностика и построение устойчивости',
      avatarColor: 'from-emerald-500 to-teal-600',
    },
    sessionsCount: 1,
    totalPlannedSessions: 5,
    isPending: true,
    startZone: 'pending',
    finalZone: 'pending',
    keyHighlight: 'Замеры собираются: сотрудник подключён к программе, проходит вводные сессии диагностики.',
    points: [],
    businessImpact: {
      executiveSummary: 'Сотрудник проходит вводный психологический чекап. Формируется персональная карта стресс-факторов.',
      workEffect: [
        'Первичная сессия знакомства с психологом проведена',
        'Подготовка индивидуального плана на следующие 4 сессии',
        'Данные динамики появятся после контрольного замера следующей недели',
      ],
      financialImpact: 'Превентивная защита: раннее выявление скрытого напряжения до падения показателей выручки.',
    },
  },
];

export const BUSINESS_STATS = {
  stressReduction: '-38%',
  stressDetail: 'С 6.5 до 4.2 в среднем среди прошедших замеры',
  energyGrowth: '5.1 → 7.0',
  energyDetail: '+37% рост запаса продуктивности команды',
  churnCount: '0 увольнений',
  churnDetail: '100% сохранение штата, спасён менеджер из кризиса',
  greenZoneShare: '4 из 5 в ресурсе',
  greenZoneDetail: '80% отдела выведены из критической зоны риска',
};

export const PSYCHOLOGISTS = [
  {
    name: 'Антон Шумкин',
    role: 'Психолог Indigo Lab',
    experience: '8+ лет практики',
    focus: 'Преодоление эмоционального выгорания, личная эффективность, стресс-менеджмент в B2B-продажах.',
    assignedClient: 'Умка Самигатова (5 сессий)',
  },
  {
    name: 'Артём Ваксер',
    role: 'Психолог Indigo Lab',
    experience: '7+ лет практики',
    focus: 'Гештальт-терапия, работа с синдромом самозванца, страхом конфликтов и отказов клиентов.',
    assignedClient: 'Татьяна Ущека (5 сессий)',
  },
  {
    name: 'Анна Ковалева',
    role: 'Бизнес-психолог Indigo Lab',
    experience: '10+ лет практики',
    focus: 'Поддержка РОПов и топ-менеджеров, фасилитация командного климата, снижение управленческого стресса.',
    assignedClient: 'Мадина (РОП, 5 сессий)',
  },
  {
    name: 'Индиго (Супервизор)',
    role: 'Клинический супервизор',
    experience: '12+ лет практики',
    focus: 'Кризисная интервенция, экстренный вывод из астении и эмоционального ступора, предотвращение увольнений.',
    assignedClient: 'Селиловская (5 сессий)',
  },
  {
    name: 'Эдгар Удрис',
    role: 'Психолог Indigo Lab',
    experience: '6+ лет практики',
    focus: 'Когнитивно-поведенческая терапия (CBT), диагностика когнитивных искажений, формирование привычек ресурса.',
    assignedClient: 'Пасечная Вера (Вводный этап)',
  },
];
