export type Locale = 'zh' | 'en';

type LocalizedText = Record<Locale, string>;

interface ResourceLinkRecord {
  title: LocalizedText;
  source: LocalizedText;
  url: string;
  description: LocalizedText;
}

interface CultureRecord {
  id: string;
  name: LocalizedText;
  period: LocalizedText;
  location: {
    lat: number;
    lng: number;
    region: LocalizedText;
  };
  description: LocalizedText;
  features: LocalizedText[];
  influence: LocalizedText[];
  color: string;
  radius: number;
}

interface EraRecord {
  id: string;
  name: LocalizedText;
  startYear: number;
  endYear: number;
  description: LocalizedText;
  headline: LocalizedText;
  context: LocalizedText;
  keyThreads: LocalizedText[];
  guideQuestions: LocalizedText[];
  resources: ResourceLinkRecord[];
  cultures: CultureRecord[];
}

export interface ResourceLink {
  title: string;
  source: string;
  url: string;
  description: string;
}

export interface Culture {
  id: string;
  name: string;
  altName: string;
  period: string;
  location: {
    lat: number;
    lng: number;
    region: string;
  };
  description: string;
  features: string[];
  influence: string[];
  color: string;
  radius: number;
}

export interface Era {
  id: string;
  name: string;
  altName: string;
  startYear: number;
  endYear: number;
  description: string;
  headline: string;
  context: string;
  keyThreads: string[];
  guideQuestions: string[];
  resources: ResourceLink[];
  cultures: Culture[];
}

const text = (zh: string, en: string): LocalizedText => ({ zh, en });

const sources = {
  met: text('大都会艺术博物馆', 'The Met'),
  britishMuseum: text('大英博物馆', 'British Museum'),
  unesco: text('联合国教科文组织', 'UNESCO'),
  libraryOfCongress: text('美国国会图书馆', 'Library of Congress'),
  scienceMuseum: text('科学博物馆', 'Science Museum'),
  britannica: text('大英百科全书', 'Encyclopaedia Britannica'),
};

const eraRecords: EraRecord[] = [
  {
    id: 'ancient',
    name: text('远古文明起源', 'Origins of Early Civilizations'),
    startYear: -3500,
    endYear: -2000,
    description: text(
      '人类最早的文明在河流流域诞生，形成了可以持续积累的城市、文字与制度。',
      'The earliest large-scale civilizations formed in river basins, where cities, writing, and institutions could accumulate across generations.',
    ),
    headline: text(
      '城市、文字与王权在大河流域逐渐成形。',
      'Cities, writing, and kingship took shape along major river systems.',
    ),
    context: text(
      '这一阶段最值得看的不是谁“最早”，而是文明如何借由治水、农耕、祭祀与记录系统，把分散的人群变成可治理、可记忆、可传承的共同体。',
      'The key question here is not who came first, but how irrigation, agriculture, ritual, and record-keeping turned dispersed communities into governable and transmissible societies.',
    ),
    keyThreads: [
      text('河流与治水', 'Rivers and hydraulic control'),
      text('文字与记忆系统', 'Writing and memory systems'),
      text('早期国家与法典', 'Early states and legal codes'),
    ],
    guideQuestions: [
      text(
        '先看四大河谷文明的空间分布，再比较它们为何都依赖稳定的水系与农业剩余。',
        'Start with the geography of the great river civilizations, then compare why stable water systems and agricultural surplus mattered so much.',
      ),
      text(
        '注意文字、历法与法典这类制度工具，它们让权力与知识得以跨代延续。',
        'Notice institutional tools such as writing, calendars, and law codes. They allowed power and knowledge to persist across generations.',
      ),
      text(
        '观察中华文明为何会在多个篇章持续出现，这提示了文明连续性的意义。',
        'Watch how Chinese civilization appears across multiple chapters. It is a useful clue to the meaning of long civilizational continuity.',
      ),
    ],
    resources: [
      {
        title: text('Heilbrunn 艺术史时间线', 'Heilbrunn Timeline of Art History'),
        source: sources.met,
        url: 'https://www.metmuseum.org/toah/',
        description: text(
          '从全球艺术史与物质文化切入，梳理古代文明的发展脉络。',
          'A strong starting point for tracing ancient civilizations through global art history and material culture.',
        ),
      },
      {
        title: text('古埃及', 'Egypt'),
        source: sources.britishMuseum,
        url: 'https://www.britishmuseum.org/collection/egypt',
        description: text(
          '适合继续阅读尼罗河文明的馆藏与专题资料。',
          'A museum gateway for extending your reading on the Nile world through objects and curatorial essays.',
        ),
      },
      {
        title: text('亚洲艺术', 'Asian Art'),
        source: sources.met,
        url: 'https://www.metmuseum.org/about-the-met/collection-areas/asian-art',
        description: text(
          '覆盖中国、南亚与东南亚早期文明相关馆藏入口。',
          'Useful for early material from China, South Asia, and Southeast Asia within a single collection area.',
        ),
      },
    ],
    cultures: [
      {
        id: 'mesopotamia',
        name: text('两河流域文明', 'Mesopotamia'),
        period: text('公元前3500年-公元前2000年', '3500-2000 BCE'),
        location: { lat: 33.2232, lng: 43.6793, region: text('西亚', 'West Asia') },
        description: text(
          '人类最早的文明之一，发明了楔形文字和轮子，建立了城邦国家。',
          'One of the earliest civilizations, known for cuneiform, the wheel, and the rise of city-states.',
        ),
        features: [
          text('楔形文字', 'Cuneiform'),
          text('汉谟拉比法典', 'Code of Hammurabi'),
          text('轮子发明', 'Wheel technology'),
          text('城市国家', 'City-states'),
        ],
        influence: [
          text('法律体系', 'Legal traditions'),
          text('文字记录', 'Written record keeping'),
          text('数学六十进制', 'Sexagesimal mathematics'),
        ],
        color: '#c65f47',
        radius: 25,
      },
      {
        id: 'egypt',
        name: text('古埃及文明', 'Ancient Egypt'),
        period: text('公元前3100年-公元前30年', '3100-30 BCE'),
        location: { lat: 26.8206, lng: 30.8025, region: text('北非', 'North Africa') },
        description: text(
          '尼罗河流域的伟大文明，以金字塔、象形文字与王权秩序闻名。',
          'A major Nile civilization remembered for pyramids, hieroglyphs, and durable kingship.',
        ),
        features: [
          text('金字塔', 'Pyramids'),
          text('象形文字', 'Hieroglyphs'),
          text('木乃伊', 'Mummification'),
          text('太阳历', 'Solar calendar'),
        ],
        influence: [
          text('建筑技术', 'Monumental building techniques'),
          text('医学知识', 'Medical knowledge'),
          text('数学几何', 'Mathematics and geometry'),
        ],
        color: '#cf8b2f',
        radius: 28,
      },
      {
        id: 'indus',
        name: text('古印度文明', 'Indus Valley'),
        period: text('公元前3300年-公元前1300年', '3300-1300 BCE'),
        location: { lat: 28.6139, lng: 77.209, region: text('南亚', 'South Asia') },
        description: text(
          '印度河流域的古老文明，拥有规划良好的城市与排水系统。',
          'An early South Asian civilization known for planned cities and advanced drainage systems.',
        ),
        features: [
          text('城市规划', 'Urban planning'),
          text('排水系统', 'Drainage systems'),
          text('印章文字', 'Seal inscriptions'),
          text('度量衡', 'Standardized weights'),
        ],
        influence: [
          text('城市规划理念', 'Urban planning principles'),
          text('数学概念', 'Mathematical ideas'),
          text('后来的印度传统', 'Later South Asian cultural foundations'),
        ],
        color: '#8f6bb3',
        radius: 22,
      },
      {
        id: 'china_ancient',
        name: text('中华文明', 'Chinese Civilization'),
        period: text('公元前2070年-至今', 'c. 2070 BCE-present'),
        location: { lat: 35.8617, lng: 104.1954, region: text('东亚', 'East Asia') },
        description: text(
          '黄河长江流域诞生的古老文明，也是延续至今的重要文明传统。',
          'A long-running civilization rooted in the Yellow and Yangtze river regions and continuous into the present.',
        ),
        features: [
          text('甲骨文', 'Oracle bone inscriptions'),
          text('青铜器', 'Bronze ritual vessels'),
          text('礼乐制度', 'Ritual order'),
          text('农耕文明', 'Agrarian base'),
        ],
        influence: [
          text('汉字文化圈', 'Sinitic cultural sphere'),
          text('儒家思想', 'Confucian thought'),
          text('政治制度', 'Statecraft traditions'),
        ],
        color: '#b24b5a',
        radius: 30,
      },
    ],
  },
  {
    id: 'classical',
    name: text('古典文明时期', 'Classical Civilizations'),
    startYear: -2000,
    endYear: 500,
    description: text(
      '帝国治理、哲学思辨与跨区域交流共同推动古典时代的形成。',
      'Imperial governance, philosophical systems, and interregional exchange shaped the classical age.',
    ),
    headline: text(
      '思想体系、帝国秩序与公共制度在这一时期被系统化。',
      'Thought systems, imperial order, and public institutions became more systematic in this era.',
    ),
    context: text(
      '这一章可以把“思想”和“制度”放在一起看：城邦、公民、法治、宗教传播和帝国行政，都是文明扩大影响范围的关键机制。',
      'This chapter works best when ideas and institutions are read together: the city-state, citizenship, law, religious transmission, and imperial administration all helped civilizations scale their influence.',
    ),
    keyThreads: [
      text('城邦与共和国', 'City-states and republics'),
      text('帝国治理', 'Imperial governance'),
      text('哲学与宗教传播', 'Philosophy and religious transmission'),
    ],
    guideQuestions: [
      text(
        '比较希腊与罗马时，不要只看艺术风格，更要看政治组织与公共生活的差异。',
        'When comparing Greece and Rome, focus not only on style but also on political organization and public life.',
      ),
      text(
        '观察波斯、印度与中国如何在不同地理尺度上发展出自己的整合秩序。',
        'Observe how Persia, India, and China each developed integrative orders at different geographic scales.',
      ),
      text(
        '注意丝绸之路等早期交流网络，它们让思想、商品与技术跨区域流动。',
        'Early exchange routes such as the Silk Roads mattered because they moved ideas, goods, and technologies across regions.',
      ),
    ],
    resources: [
      {
        title: text('Heilbrunn 艺术史时间线', 'Heilbrunn Timeline of Art History'),
        source: sources.met,
        url: 'https://www.metmuseum.org/toah/',
        description: text(
          '可从年代、地域和主题入口追踪古典时代的艺术与制度变化。',
          'Useful for following classical change through time, geography, and theme.',
        ),
      },
      {
        title: text('希腊与罗马', 'Greece and Rome'),
        source: sources.britishMuseum,
        url: 'https://www.britishmuseum.org/our-work/departments/greece-and-rome',
        description: text(
          '英国博物馆关于古希腊、古罗马及地中海世界的核心入口。',
          'A central entry point into the Greek, Roman, and Mediterranean worlds.',
        ),
      },
      {
        title: text('希腊与罗马人的生活', 'Greek and Roman life'),
        source: sources.britishMuseum,
        url: 'https://www.britishmuseum.org/collection/galleries/greek-and-roman-life',
        description: text(
          '从日常生活角度理解古典文明的制度、宗教与社会结构。',
          'A useful angle on institutions, religion, and social structure through everyday life.',
        ),
      },
    ],
    cultures: [
      {
        id: 'greece',
        name: text('古希腊文明', 'Ancient Greece'),
        period: text('公元前800年-公元前146年', '800-146 BCE'),
        location: { lat: 39.0742, lng: 21.8243, region: text('欧洲', 'Europe') },
        description: text(
          '西方文明的重要源头之一，民主政治、哲学与戏剧传统在此成熟。',
          'A major source of Western traditions, where democratic experiments, philosophy, and drama took mature forms.',
        ),
        features: [
          text('民主政治', 'Democratic politics'),
          text('哲学思想', 'Philosophy'),
          text('奥林匹克', 'Olympic games'),
          text('戏剧艺术', 'Theater'),
        ],
        influence: [
          text('西方民主', 'Democratic traditions'),
          text('哲学传统', 'Philosophical traditions'),
          text('艺术美学', 'Classical aesthetics'),
        ],
        color: '#4b87b7',
        radius: 26,
      },
      {
        id: 'rome',
        name: text('古罗马文明', 'Ancient Rome'),
        period: text('公元前753年-公元476年', '753 BCE-476 CE'),
        location: { lat: 41.9028, lng: 12.4964, region: text('欧洲', 'Europe') },
        description: text(
          '伟大的帝国文明，以法律、工程与政治制度对后世影响深远。',
          'A powerful imperial civilization whose law, engineering, and political institutions shaped later worlds.',
        ),
        features: [
          text('罗马法', 'Roman law'),
          text('共和制度', 'Republican institutions'),
          text('工程技术', 'Engineering'),
          text('军事组织', 'Military organization'),
        ],
        influence: [
          text('法律体系', 'Legal systems'),
          text('政治制度', 'Political institutions'),
          text('语言文化', 'Language and cultural transmission'),
        ],
        color: '#7d5ba6',
        radius: 28,
      },
      {
        id: 'persia',
        name: text('波斯帝国', 'Persian Empire'),
        period: text('公元前550年-公元651年', '550 BCE-651 CE'),
        location: { lat: 32.4279, lng: 53.688, region: text('西亚', 'West Asia') },
        description: text(
          '横跨欧亚非的大帝国，以行省制度与多元包容著称。',
          'A vast empire across Eurasia and Africa, noted for provincial administration and relative pluralism.',
        ),
        features: [
          text('行省制度', 'Provincial governance'),
          text('驿道系统', 'Road and relay systems'),
          text('琐罗亚斯德教', 'Zoroastrianism'),
          text('皇家建筑', 'Imperial architecture'),
        ],
        influence: [
          text('帝国治理', 'Imperial governance models'),
          text('文化交流', 'Intercultural exchange'),
          text('宗教思想', 'Religious thought'),
        ],
        color: '#3f8a79',
        radius: 25,
      },
      {
        id: 'india_classical',
        name: text('印度古典文明', 'Classical India'),
        period: text('公元前322年-公元550年', '322 BCE-550 CE'),
        location: { lat: 20.5937, lng: 78.9629, region: text('南亚', 'South Asia') },
        description: text(
          '孔雀王朝与笈多王朝时期的辉煌文明，宗教与学术发展迅速。',
          'A flourishing civilizational phase associated with the Maurya and Gupta worlds, marked by rapid religious and scholarly development.',
        ),
        features: [
          text('佛教兴起', 'Rise of Buddhism'),
          text('阿拉伯数字', 'Numerical innovation'),
          text('医学体系', 'Medical traditions'),
          text('文学艺术', 'Literature and arts'),
        ],
        influence: [
          text('佛教传播', 'Buddhist transmission'),
          text('数学发展', 'Mathematical development'),
          text('医学知识', 'Medical knowledge'),
        ],
        color: '#b36b28',
        radius: 24,
      },
      {
        id: 'china_classical',
        name: text('中华古典文明', 'Classical China'),
        period: text('公元前221年-公元589年', '221 BCE-589 CE'),
        location: { lat: 34.3416, lng: 108.9398, region: text('东亚', 'East Asia') },
        description: text(
          '秦汉魏晋南北朝时期，统一帝国与经典政治文化的核心逐渐形成。',
          'From Qin through the Northern and Southern dynasties, imperial unification and classical political culture took durable shape.',
        ),
        features: [
          text('统一帝国', 'Unified empire'),
          text('儒家正统', 'Confucian orthodoxy'),
          text('丝绸之路', 'Silk Roads'),
          text('造纸术', 'Papermaking'),
        ],
        influence: [
          text('东亚文化圈', 'East Asian cultural sphere'),
          text('政治制度', 'State institutions'),
          text('科技发明', 'Technological inventions'),
        ],
        color: '#af4d41',
        radius: 28,
      },
    ],
  },
  {
    id: 'medieval',
    name: text('中古文明交融', 'Medieval Interconnections'),
    startYear: 500,
    endYear: 1500,
    description: text(
      '贸易网络、宗教世界与帝国扩张让欧亚大陆出现更密集的文明互动。',
      'Trade routes, religious worlds, and imperial expansion created denser interactions across Eurasia.',
    ),
    headline: text(
      '中世纪并不封闭，它是跨大陆网络不断加密的时代。',
      'The medieval world was not sealed off. It was an era of denser transcontinental networks.',
    ),
    context: text(
      '这一阶段最重要的变化，是文明中心不再只靠单一帝国支撑，而是由丝路、海路、宗教共同体与知识翻译活动共同连接起来。',
      'The decisive change here is that influence no longer depended on a single empire alone. Silk Roads, sea routes, religious communities, and translation movements connected multiple centers together.',
    ),
    keyThreads: [
      text('丝路与海路', 'Silk routes and sea routes'),
      text('宗教共同体', 'Religious communities'),
      text('欧亚大陆连接', 'Eurasian connectivity'),
    ],
    guideQuestions: [
      text(
        '观察伊斯兰文明、拜占庭与唐宋中国如何在不同方向上成为知识与贸易枢纽。',
        'Observe how the Islamic world, Byzantium, and Tang-Song China each became hubs of knowledge and trade in different directions.',
      ),
      text(
        '理解“中世纪”不是停滞，而是不断发生翻译、传播、吸收与重组。',
        'Treat the medieval period not as stagnation, but as a period of translation, transmission, absorption, and recombination.',
      ),
      text(
        '注意蒙古帝国如何通过军事征服反而加速了欧亚信息与技术流动。',
        'Notice how the Mongol Empire, through conquest, also accelerated the movement of information and technology across Eurasia.',
      ),
    ],
    resources: [
      {
        title: text('丝绸之路项目', 'The UNESCO Silk Roads Programme'),
        source: sources.unesco,
        url: 'https://www.unesco.org/en/silkroads',
        description: text(
          '从全球交流史角度理解欧亚大陆的商贸、知识与文化流动。',
          'A strong reference for understanding commercial, intellectual, and cultural movement across Eurasia.',
        ),
      },
      {
        title: text('伊斯兰艺术', 'Islamic Art'),
        source: sources.met,
        url: 'https://www.metmuseum.org/about-the-met/collection-areas/islamic-art',
        description: text(
          '通过馆藏和策展资料理解伊斯兰世界的跨区域影响。',
          'Useful for reading the Islamic world through objects and curatorial interpretation.',
        ),
      },
      {
        title: text('Heilbrunn 艺术史时间线', 'Heilbrunn Timeline of Art History'),
        source: sources.met,
        url: 'https://www.metmuseum.org/toah/',
        description: text(
          '适合继续追踪拜占庭、中世纪欧洲与亚洲文明的并行变化。',
          'Helpful for tracking Byzantine, medieval European, and Asian developments side by side.',
        ),
      },
    ],
    cultures: [
      {
        id: 'islamic',
        name: text('伊斯兰文明', 'Islamic Civilization'),
        period: text('7世纪-15世纪', '7th-15th centuries'),
        location: { lat: 24.7136, lng: 46.6753, region: text('西亚', 'West Asia') },
        description: text(
          '阿拉伯帝国开创的辉煌文明，是科学、翻译与跨文化传播的重要节点。',
          'A major civilization of the Islamic world, central to science, translation, and cross-cultural transmission.',
        ),
        features: [
          text('伊斯兰教', 'Islam'),
          text('科学发展', 'Scientific development'),
          text('翻译运动', 'Translation movement'),
          text('艺术创作', 'Artistic production'),
        ],
        influence: [
          text('科学传播', 'Transmission of science'),
          text('数学发展', 'Mathematical development'),
          text('文化交流', 'Cross-cultural exchange'),
        ],
        color: '#4b9b74',
        radius: 32,
      },
      {
        id: 'byzantine',
        name: text('拜占庭帝国', 'Byzantine Empire'),
        period: text('330年-1453年', '330-1453 CE'),
        location: { lat: 41.0082, lng: 28.9784, region: text('欧洲', 'Europe') },
        description: text(
          '东罗马帝国的延续，也是古典传统与基督教世界的重要连接者。',
          'The continuation of the Eastern Roman Empire and a key bridge between classical inheritance and the Christian world.',
        ),
        features: [
          text('东正教', 'Eastern Orthodoxy'),
          text('君士坦丁堡', 'Constantinople'),
          text('查士丁尼法典', 'Justinian Code'),
          text('马赛克艺术', 'Mosaic art'),
        ],
        influence: [
          text('东正教传统', 'Orthodox traditions'),
          text('法律体系', 'Legal legacy'),
          text('艺术风格', 'Artistic styles'),
        ],
        color: '#7a619f',
        radius: 24,
      },
      {
        id: 'europe_medieval',
        name: text('欧洲中世纪', 'Medieval Europe'),
        period: text('5世纪-15世纪', '5th-15th centuries'),
        location: { lat: 48.8566, lng: 2.3522, region: text('欧洲', 'Europe') },
        description: text(
          '封建制度与基督教秩序主导下的欧洲社会，也孕育了大学和城市复兴。',
          'A Europe shaped by feudal structures and Christian order, but also by universities and urban revival.',
        ),
        features: [
          text('封建制度', 'Feudal order'),
          text('哥特式建筑', 'Gothic architecture'),
          text('大学兴起', 'Rise of universities'),
          text('骑士文化', 'Chivalric culture'),
        ],
        influence: [
          text('现代大学', 'University traditions'),
          text('法律制度', 'Legal development'),
          text('文化传统', 'Cultural inheritances'),
        ],
        color: '#425060',
        radius: 26,
      },
      {
        id: 'china_medieval',
        name: text('唐宋文明', 'Tang-Song China'),
        period: text('618年-1279年', '618-1279 CE'),
        location: { lat: 34.7466, lng: 113.6253, region: text('东亚', 'East Asia') },
        description: text(
          '中华文明的黄金时期之一，经济、科技与文化创造力都达到高峰。',
          'One of the golden ages of Chinese civilization, marked by major peaks in economy, technology, and cultural creativity.',
        ),
        features: [
          text('科举制度', 'Civil service examinations'),
          text('诗词艺术', 'Poetry and literary arts'),
          text('四大发明', 'Major inventions'),
          text('海上贸易', 'Maritime trade'),
        ],
        influence: [
          text('东亚文化', 'East Asian cultural influence'),
          text('科技传播', 'Technological transmission'),
          text('经济模式', 'Commercial patterns'),
        ],
        color: '#b74e45',
        radius: 30,
      },
      {
        id: 'mongol',
        name: text('蒙古帝国', 'Mongol Empire'),
        period: text('1206年-1368年', '1206-1368 CE'),
        location: { lat: 47.9185, lng: 106.9177, region: text('中亚', 'Central Asia') },
        description: text(
          '历史上最大的陆地帝国之一，强化了欧亚大陆间的人员与信息流动。',
          'One of the largest land empires in history, strengthening the movement of people and information across Eurasia.',
        ),
        features: [
          text('骑兵战术', 'Cavalry warfare'),
          text('驿站系统', 'Relay-post system'),
          text('宗教宽容', 'Religious tolerance'),
          text('贸易保护', 'Trade protection'),
        ],
        influence: [
          text('欧亚交流', 'Eurasian exchange'),
          text('文化传播', 'Cultural transmission'),
          text('技术传播', 'Technological transfer'),
        ],
        color: '#4b8b81',
        radius: 28,
      },
    ],
  },
  {
    id: 'exploration',
    name: text('大航海时代', 'Age of Exploration'),
    startYear: 1400,
    endYear: 1700,
    description: text(
      '航海、印刷与知识革命让世界被重新测量，也让全球联系大幅加深。',
      'Navigation, print culture, and knowledge revolutions remapped the world and deepened global connections.',
    ),
    headline: text(
      '世界被重新连接，同时也被重新划分与竞争。',
      'The world was reconnected, but also repartitioned and contested.',
    ),
    context: text(
      '这一时期既有文艺复兴的人文转向，也有宗教改革、新航路、殖民扩张与全球贸易网络的形成。它是“现代世界”诞生前的关键转折带。',
      'This period combines the humanism of the Renaissance with reform, oceanic expansion, colonial competition, and the formation of global trade networks. It is a crucial turning zone before the modern world fully emerges.',
    ),
    keyThreads: [
      text('海权与贸易', 'Sea power and trade'),
      text('印刷与宗教改革', 'Print culture and reform'),
      text('科学观察与测量', 'Scientific observation and measurement'),
    ],
    guideQuestions: [
      text(
        '把文艺复兴、宗教改革与航海扩张放在一起看，才能理解欧洲为何迅速外溢。',
        'Read the Renaissance, Reformation, and maritime expansion together to understand why Europe projected outward so quickly.',
      ),
      text(
        '注意“发现”并不只是地理事件，更是地图、知识和权力重新分配的过程。',
        'Treat discovery not only as a geographic event, but as a redistribution of maps, knowledge, and power.',
      ),
      text(
        '观察明朝中国在海洋探索上的高点与后续收缩，这能帮助理解不同现代化路径。',
        'Watch the Ming maritime high point and later contraction to compare alternative paths into modernity.',
      ),
    ],
    resources: [
      {
        title: text('发现与探索图像资料', 'Free to Use and Reuse: Discovery and Exploration'),
        source: sources.libraryOfCongress,
        url: 'https://www.loc.gov/free-to-use/discovery-and-exploration/',
        description: text(
          '通过地图、版画与档案材料理解地理发现与世界图像的变化。',
          'A useful archive of maps and visual material for understanding exploration and changing world images.',
        ),
      },
      {
        title: text('科学之城 1550-1800', 'Science City 1550-1800: The Linbury Gallery'),
        source: sources.scienceMuseum,
        url: 'https://www.sciencemuseum.org.uk/see-and-do/science-city-1550-1800-linbury-gallery',
        description: text(
          '把贸易、实验、测量和城市发展放进同一历史框架。',
          'A strong way to connect trade, experiment, measurement, and urban growth in the early modern world.',
        ),
      },
      {
        title: text('欧洲雕塑与装饰艺术', 'European Sculpture and Decorative Arts'),
        source: sources.met,
        url: 'https://www.metmuseum.org/about-the-met/collection-areas/european-sculpture-and-decorative-arts/',
        description: text(
          '从欧洲早期现代物质文化进入文艺复兴和全球贸易体系。',
          'A collection entry point into Renaissance material culture and expanding global exchange.',
        ),
      },
    ],
    cultures: [
      {
        id: 'renaissance',
        name: text('文艺复兴', 'Renaissance'),
        period: text('14世纪-17世纪', '14th-17th centuries'),
        location: { lat: 43.7696, lng: 11.2558, region: text('欧洲', 'Europe') },
        description: text(
          '欧洲文化和艺术的复兴，人文主义与古典精神被重新激活。',
          'A cultural and artistic revival in Europe that reactivated humanism and classical inheritance.',
        ),
        features: [
          text('人文主义', 'Humanism'),
          text('艺术创新', 'Artistic innovation'),
          text('科学探索', 'Scientific curiosity'),
          text('古典复兴', 'Classical revival'),
        ],
        influence: [
          text('现代艺术', 'Modern artistic traditions'),
          text('科学方法', 'Scientific method'),
          text('思想解放', 'Intellectual liberation'),
        ],
        color: '#cf8f37',
        radius: 26,
      },
      {
        id: 'reformation',
        name: text('宗教改革', 'Reformation'),
        period: text('16世纪', '16th century'),
        location: { lat: 51.1657, lng: 10.4515, region: text('欧洲', 'Europe') },
        description: text(
          '基督教世界的分裂重组，宗教与政治版图随之发生深刻变化。',
          'A major reordering of the Christian world that reshaped both confessional and political landscapes.',
        ),
        features: [
          text('新教兴起', 'Rise of Protestantism'),
          text('宗教战争', 'Wars of religion'),
          text('印刷术', 'Print culture'),
          text('思想自由', 'Debates on conscience'),
        ],
        influence: [
          text('宗教多元化', 'Religious pluralization'),
          text('教育普及', 'Expansion of literacy and education'),
          text('资本主义', 'New economic cultures'),
        ],
        color: '#7a60a0',
        radius: 24,
      },
      {
        id: 'age_discovery',
        name: text('地理大发现', 'Age of Discovery'),
        period: text('15世纪-17世纪', '15th-17th centuries'),
        location: { lat: 38.7223, lng: -9.1393, region: text('欧洲', 'Europe') },
        description: text(
          '欧洲航海扩展世界联系，也重塑了全球贸易与殖民格局。',
          'Oceanic expansion enlarged global contact while reshaping trade and colonial power.',
        ),
        features: [
          text('新航路开辟', 'New sea routes'),
          text('殖民扩张', 'Colonial expansion'),
          text('物种交换', 'Columbian exchange'),
          text('全球贸易', 'Global trade'),
        ],
        influence: [
          text('全球化开端', 'Early globalization'),
          text('殖民体系', 'Colonial systems'),
          text('文化交流', 'Intercultural contact'),
        ],
        color: '#4b87b7',
        radius: 28,
      },
      {
        id: 'ming',
        name: text('明朝中国', 'Ming China'),
        period: text('1368年-1644年', '1368-1644 CE'),
        location: { lat: 39.9042, lng: 116.4074, region: text('东亚', 'East Asia') },
        description: text(
          '郑和下西洋、城市文化繁荣与海禁并存，是一条不同于欧洲的海洋路径。',
          'A maritime path distinct from Europe, combining Zheng He voyages, urban culture, and later sea restrictions.',
        ),
        features: [
          text('郑和下西洋', 'Zheng He voyages'),
          text('紫禁城', 'Forbidden City'),
          text('永乐大典', 'Yongle Encyclopedia'),
          text('海禁政策', 'Maritime restrictions'),
        ],
        influence: [
          text('东亚秩序', 'East Asian order'),
          text('海洋探索', 'Maritime experimentation'),
          text('文化传播', 'Cultural circulation'),
        ],
        color: '#b84e44',
        radius: 28,
      },
    ],
  },
  {
    id: 'industrial',
    name: text('工业革命', 'Industrial Revolution'),
    startYear: 1760,
    endYear: 1914,
    description: text(
      '机器、能源与工厂重塑了生产方式，也改变了城市、劳动与国家竞争。',
      'Machines, energy systems, and factories transformed production, cities, labor, and state rivalry.',
    ),
    headline: text(
      '从手工世界到机器世界，社会节奏被重新定义。',
      'The move from the handmade world to the machine world redefined the tempo of society.',
    ),
    context: text(
      '工业革命不只是技术升级，它把劳动组织、城市生活、国家能力和全球市场一起改写。现代性的许多矛盾，也在这一阶段清晰显形。',
      'Industrialization was not just a technical upgrade. It rewrote labor organization, urban life, state capacity, and the global market at the same time. Many tensions of modernity became sharply visible here.',
    ),
    keyThreads: [
      text('蒸汽与工厂', 'Steam and factories'),
      text('城市化与劳动', 'Urbanization and labor'),
      text('全球工业扩散', 'Global industrial diffusion'),
    ],
    guideQuestions: [
      text(
        '先看英国，再看美国、日本与欧洲大陆，理解工业化如何向不同制度环境扩散。',
        'Begin with Britain, then compare the United States, Japan, and continental Europe to see how industrialization spread across different institutional settings.',
      ),
      text(
        '不要只看发明本身，更要看工厂制度、铁路与城市生活如何改变普通人的日常。',
        'Look beyond inventions themselves and pay attention to how factories, railways, and cities transformed everyday life.',
      ),
      text(
        '注意这一时期的现代国家、现代战争和现代大众文化开始互相强化。',
        'Notice how the modern state, modern warfare, and mass culture began reinforcing one another during this period.',
      ),
    ],
    resources: [
      {
        title: text('塑造现代世界', 'Making the Modern World'),
        source: sources.scienceMuseum,
        url: 'https://www.sciencemuseum.org.uk/see-and-do/making-modern-world',
        description: text(
          '通过关键工业对象理解工业化如何塑造现代世界。',
          'A strong object-based introduction to how industrialization shaped the modern world.',
        ),
      },
      {
        title: text('工业革命', 'Industrial Revolution'),
        source: sources.britannica,
        url: 'https://www.britannica.com/event/Industrial-Revolution',
        description: text(
          '工业革命的历史、阶段划分及社会影响概览。',
          'A concise overview of the history, phases, and social consequences of industrialization.',
        ),
      },
      {
        title: text('信息时代', 'Information Age'),
        source: sources.scienceMuseum,
        url: 'https://www.sciencemuseum.org.uk/see-and-do/information-age',
        description: text(
          '把工业革命延伸到通信革命，理解技术社会的连续发展。',
          'Useful for extending the story from industrialization into communication revolutions and technical society.',
        ),
      },
    ],
    cultures: [
      {
        id: 'britain_industrial',
        name: text('英国工业革命', 'British Industrial Revolution'),
        period: text('1760年-1840年', '1760-1840 CE'),
        location: { lat: 52.3555, lng: -1.1743, region: text('欧洲', 'Europe') },
        description: text(
          '工业革命的发源地，工厂制度和机械化生产在这里迅速成型。',
          'The initial core of industrialization, where the factory system and mechanized production took early form.',
        ),
        features: [
          text('蒸汽机', 'Steam engine'),
          text('工厂制度', 'Factory system'),
          text('铁路时代', 'Railway age'),
          text('纺织工业', 'Textile industry'),
        ],
        influence: [
          text('工业模式', 'Industrial model'),
          text('城市化', 'Urbanization'),
          text('社会变革', 'Social transformation'),
        ],
        color: '#43515f',
        radius: 28,
      },
      {
        id: 'american',
        name: text('美国文明', 'American Civilization'),
        period: text('1776年-至今', '1776-present'),
        location: { lat: 39.8283, lng: -98.5795, region: text('北美', 'North America') },
        description: text(
          '新兴国家在工业、制度与文化传播层面迅速扩大影响力。',
          'A rising state that expanded influence rapidly through industry, institutions, and cultural projection.',
        ),
        features: [
          text('民主共和', 'Democratic republic'),
          text('联邦制度', 'Federal system'),
          text('西进运动', 'Westward expansion'),
          text('移民文化', 'Immigrant society'),
        ],
        influence: [
          text('民主制度', 'Democratic institutions'),
          text('经济模式', 'Economic models'),
          text('文化输出', 'Cultural export'),
        ],
        color: '#4f8bb9',
        radius: 30,
      },
      {
        id: 'europe_modern',
        name: text('现代欧洲', 'Modern Europe'),
        period: text('19世纪', '19th century'),
        location: { lat: 50.8503, lng: 4.3517, region: text('欧洲', 'Europe') },
        description: text(
          '民族国家兴起，启蒙遗产、科学发展与城市文化共同扩张。',
          'A Europe of nation-states, Enlightenment legacies, scientific growth, and expanding urban culture.',
        ),
        features: [
          text('民族国家', 'Nation-states'),
          text('科学革命', 'Scientific advance'),
          text('启蒙思想', 'Enlightenment thought'),
          text('艺术创新', 'Artistic experimentation'),
        ],
        influence: [
          text('现代政治', 'Modern politics'),
          text('科学方法', 'Scientific method'),
          text('文化潮流', 'Cultural trends'),
        ],
        color: '#916db0',
        radius: 26,
      },
      {
        id: 'japan_meiji',
        name: text('明治日本', 'Meiji Japan'),
        period: text('1868年-1912年', '1868-1912 CE'),
        location: { lat: 35.6762, lng: 139.6503, region: text('东亚', 'East Asia') },
        description: text(
          '通过制度改革和工业建设迅速完成现代国家转型。',
          'A rapid modern state transformation driven by institutional reform and industrial development.',
        ),
        features: [
          text('明治维新', 'Meiji Restoration'),
          text('富国强兵', 'State strengthening'),
          text('文明开化', 'Civilization and enlightenment'),
          text('工业建设', 'Industrial build-out'),
        ],
        influence: [
          text('亚洲现代化', 'Asian modernization'),
          text('制度创新', 'Institutional innovation'),
          text('文化融合', 'Cultural synthesis'),
        ],
        color: '#bb5f79',
        radius: 24,
      },
    ],
  },
  {
    id: 'contemporary',
    name: text('当代全球化', 'Contemporary Globalization'),
    startYear: 1945,
    endYear: 2024,
    description: text(
      '信息技术、全球治理与文化多样性交织，世界进入实时互联的新阶段。',
      'Information technology, global governance, and cultural diversity combine in a world of near real-time interconnection.',
    ),
    headline: text(
      '全球化让文化传播更快，也让认同、治理与伦理问题更复杂。',
      'Globalization speeds up cultural circulation while making identity, governance, and ethics more complex.',
    ),
    context: text(
      '这一章最适合从“网络”而不是“国家”出发来理解：媒介网络、供应链网络、知识网络与平台网络共同改变了文化流动、创新速度与公共生活。',
      'This chapter is easier to read through networks rather than states alone. Media systems, supply chains, knowledge circuits, and platforms all reshape cultural flow, innovation speed, and public life.',
    ),
    keyThreads: [
      text('网络社会', 'Network society'),
      text('多元文化', 'Cultural plurality'),
      text('技术伦理与治理', 'Technology, ethics, and governance'),
    ],
    guideQuestions: [
      text(
        '从信息时代切入，理解技术平台如何改变文化生产、传播和参与方式。',
        'Use the information age as an entry point for understanding how platforms change cultural production, circulation, and participation.',
      ),
      text(
        '比较全球文化与本土文化的关系，注意它们并不是简单替代，而是持续重组。',
        'Compare global and local culture carefully. They do not simply replace each other; they continuously recombine.',
      ),
      text(
        '把现代中国、欧盟和全球治理放在一起看，理解多极化与协作并存的现实。',
        'Read modern China, the European Union, and global governance together to understand a world of both multipolarity and coordination.',
      ),
    ],
    resources: [
      {
        title: text('文化表达多样性', 'Diversity of Cultural Expression'),
        source: sources.unesco,
        url: 'https://www.unesco.org/en/diversity-cultural-expression',
        description: text(
          '联合国教科文组织关于文化多样性与文化表达保护的核心入口。',
          'A key official entry point on cultural diversity and the protection of cultural expression.',
        ),
      },
      {
        title: text('信息时代', 'Information Age'),
        source: sources.scienceMuseum,
        url: 'https://www.sciencemuseum.org.uk/see-and-do/information-age',
        description: text(
          '以通信与信息技术对象梳理现代信息社会的形成过程。',
          'A useful object-based guide to the making of the modern information society.',
        ),
      },
      {
        title: text('人工智能伦理', 'Ethics of Artificial Intelligence'),
        source: sources.unesco,
        url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
        description: text(
          '理解人工智能时代文化、治理与伦理议题的重要官方入口。',
          'An authoritative official reference for culture, governance, and ethics in the age of AI.',
        ),
      },
    ],
    cultures: [
      {
        id: 'information_age',
        name: text('信息时代', 'Information Age'),
        period: text('20世纪末-至今', 'Late 20th century-present'),
        location: { lat: 37.7749, lng: -122.4194, region: text('北美', 'North America') },
        description: text(
          '互联网和数字技术革命彻底改变了信息传播与协作方式。',
          'The internet and digital technologies transformed the circulation of information and the structure of collaboration.',
        ),
        features: [
          text('互联网', 'Internet'),
          text('人工智能', 'Artificial intelligence'),
          text('移动通信', 'Mobile communication'),
          text('社交媒体', 'Social media'),
        ],
        influence: [
          text('全球连接', 'Global connectivity'),
          text('知识共享', 'Knowledge sharing'),
          text('经济变革', 'Economic transformation'),
        ],
        color: '#339fb8',
        radius: 32,
      },
      {
        id: 'global_culture',
        name: text('全球文化', 'Global Culture'),
        period: text('21世纪', '21st century'),
        location: { lat: 40.7128, lng: -74.006, region: text('全球', 'Global') },
        description: text(
          '多元文化持续交融，全球流行文化与地方经验同时塑造认同。',
          'Plural cultures continue to blend, with global popular culture and local experience shaping identity at the same time.',
        ),
        features: [
          text('文化交融', 'Cultural hybridity'),
          text('价值多元', 'Value pluralism'),
          text('创意产业', 'Creative industries'),
          text('可持续发展', 'Sustainability agendas'),
        ],
        influence: [
          text('文化认同', 'Cultural identity'),
          text('全球治理', 'Global governance'),
          text('跨境协作', 'Transnational collaboration'),
        ],
        color: '#d58c2f',
        radius: 28,
      },
      {
        id: 'china_modern',
        name: text('现代中国', 'Modern China'),
        period: text('1949年-至今', '1949-present'),
        location: { lat: 39.9042, lng: 116.4074, region: text('东亚', 'East Asia') },
        description: text(
          '在现代化、科技创新与文化传承之间形成独特的发展路径。',
          'A distinct developmental path balancing modernization, technological innovation, and cultural inheritance.',
        ),
        features: [
          text('改革开放', 'Reform and opening'),
          text('科技创新', 'Technological innovation'),
          text('文化传承', 'Cultural inheritance'),
          text('一带一路', 'Belt and Road'),
        ],
        influence: [
          text('发展模式', 'Development models'),
          text('文化复兴', 'Cultural renewal'),
          text('全球治理', 'Global governance participation'),
        ],
        color: '#bb5144',
        radius: 30,
      },
      {
        id: 'eu',
        name: text('欧盟', 'European Union'),
        period: text('1993年-至今', '1993-present'),
        location: { lat: 50.8503, lng: 4.3517, region: text('欧洲', 'Europe') },
        description: text(
          '欧洲一体化是区域合作、规范治理与制度协调的重要实验。',
          'European integration remains a major experiment in regional cooperation, rule-making, and institutional coordination.',
        ),
        features: [
          text('区域一体化', 'Regional integration'),
          text('共同市场', 'Single market'),
          text('欧元货币', 'Euro currency'),
          text('民主价值', 'Democratic values'),
        ],
        influence: [
          text('区域合作', 'Regional cooperation'),
          text('治理模式', 'Governance models'),
          text('和平发展', 'Peaceful development frameworks'),
        ],
        color: '#5f6db6',
        radius: 26,
      },
    ],
  },
];

const invertLocale = (locale: Locale): Locale => (locale === 'zh' ? 'en' : 'zh');

const localizeText = (value: LocalizedText, locale: Locale) => value[locale];

const localizeList = (values: LocalizedText[], locale: Locale) =>
  values.map((value) => localizeText(value, locale));

const localizeCulture = (culture: CultureRecord, locale: Locale): Culture => ({
  id: culture.id,
  name: localizeText(culture.name, locale),
  altName: localizeText(culture.name, invertLocale(locale)),
  period: localizeText(culture.period, locale),
  location: {
    lat: culture.location.lat,
    lng: culture.location.lng,
    region: localizeText(culture.location.region, locale),
  },
  description: localizeText(culture.description, locale),
  features: localizeList(culture.features, locale),
  influence: localizeList(culture.influence, locale),
  color: culture.color,
  radius: culture.radius,
});

const localizeResource = (resource: ResourceLinkRecord, locale: Locale): ResourceLink => ({
  title: localizeText(resource.title, locale),
  source: localizeText(resource.source, locale),
  url: resource.url,
  description: localizeText(resource.description, locale),
});

const localizeEra = (era: EraRecord, locale: Locale): Era => ({
  id: era.id,
  name: localizeText(era.name, locale),
  altName: localizeText(era.name, invertLocale(locale)),
  startYear: era.startYear,
  endYear: era.endYear,
  description: localizeText(era.description, locale),
  headline: localizeText(era.headline, locale),
  context: localizeText(era.context, locale),
  keyThreads: localizeList(era.keyThreads, locale),
  guideQuestions: localizeList(era.guideQuestions, locale),
  resources: era.resources.map((resource) => localizeResource(resource, locale)),
  cultures: era.cultures.map((culture) => localizeCulture(culture, locale)),
});

const eraCache: Record<Locale, Era[]> = {
  zh: eraRecords.map((era) => localizeEra(era, 'zh')),
  en: eraRecords.map((era) => localizeEra(era, 'en')),
};

export const eras = eraCache.zh;

export const getEras = (locale: Locale): Era[] => eraCache[locale];

export const getEraById = (id: string, locale: Locale = 'zh'): Era | undefined =>
  getEras(locale).find((era) => era.id === id);

export const getCultureById = (
  id: string,
  locale: Locale = 'zh',
): Culture | undefined => {
  for (const era of getEras(locale)) {
    const culture = era.cultures.find((candidate) => candidate.id === id);
    if (culture) return culture;
  }
  return undefined;
};

export const getSpotlightCulture = (era: Era): Culture =>
  era.cultures.reduce((current, candidate) => {
    return candidate.radius > current.radius ? candidate : current;
  }, era.cultures[0]);
