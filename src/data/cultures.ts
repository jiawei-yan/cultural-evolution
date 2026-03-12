export interface ResourceLink {
  title: string;
  source: string;
  url: string;
  description: string;
}

export interface Culture {
  id: string;
  name: string;
  nameEn: string;
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

export const eras: Era[] = [
  {
    id: 'ancient',
    name: '远古文明起源',
    startYear: -3500,
    endYear: -2000,
    description: '人类最早的文明在河流流域诞生，形成了可以持续积累的城市、文字与制度。',
    headline: '城市、文字与王权在大河流域逐渐成形。',
    context:
      '这一阶段最值得看的不是谁“最早”，而是文明如何借由治水、农耕、祭祀与记录系统，把分散的人群变成可治理、可记忆、可传承的共同体。',
    keyThreads: ['河流与治水', '文字与记忆系统', '早期国家与法典'],
    guideQuestions: [
      '先看四大河谷文明的空间分布，再比较它们为何都依赖稳定的水系与农业剩余。',
      '注意文字、历法与法典这类制度工具，它们让权力与知识得以跨代延续。',
      '观察中华文明为何会在多个篇章持续出现，这提示了文明连续性的意义。',
    ],
    resources: [
      {
        title: 'Heilbrunn Timeline of Art History',
        source: 'The Met',
        url: 'https://www.metmuseum.org/toah/',
        description: '以全球艺术史与物质文化为切口，梳理古代文明的发展脉络。',
      },
      {
        title: 'Egypt',
        source: 'British Museum',
        url: 'https://www.britishmuseum.org/collection/egypt',
        description: '古埃及馆藏与专题解读，适合延伸阅读尼罗河文明。',
      },
      {
        title: 'Asian Art',
        source: 'The Met',
        url: 'https://www.metmuseum.org/about-the-met/collection-areas/asian-art',
        description: '覆盖中国、南亚与东南亚早期文明相关馆藏入口。',
      },
    ],
    cultures: [
      {
        id: 'mesopotamia',
        name: '两河流域文明',
        nameEn: 'Mesopotamia',
        period: '公元前3500年-公元前2000年',
        location: { lat: 33.2232, lng: 43.6793, region: '西亚' },
        description: '人类最早的文明之一，发明了楔形文字和轮子，建立了城邦国家。',
        features: ['楔形文字', '汉谟拉比法典', '轮子发明', '城市国家'],
        influence: ['法律体系', '文字记录', '数学六十进制'],
        color: '#c65f47',
        radius: 25,
      },
      {
        id: 'egypt',
        name: '古埃及文明',
        nameEn: 'Ancient Egypt',
        period: '公元前3100年-公元前30年',
        location: { lat: 26.8206, lng: 30.8025, region: '北非' },
        description: '尼罗河流域的伟大文明，以金字塔、象形文字与王权秩序闻名。',
        features: ['金字塔', '象形文字', '木乃伊', '太阳历'],
        influence: ['建筑技术', '医学知识', '数学几何'],
        color: '#cf8b2f',
        radius: 28,
      },
      {
        id: 'indus',
        name: '古印度文明',
        nameEn: 'Indus Valley',
        period: '公元前3300年-公元前1300年',
        location: { lat: 28.6139, lng: 77.209, region: '南亚' },
        description: '印度河流域的古老文明，拥有规划良好的城市与排水系统。',
        features: ['城市规划', '排水系统', '印章文字', '度量衡'],
        influence: ['城市规划理念', '数学概念', '后来的印度教'],
        color: '#8f6bb3',
        radius: 22,
      },
      {
        id: 'china_ancient',
        name: '中华文明',
        nameEn: 'Chinese Civilization',
        period: '公元前2070年-至今',
        location: { lat: 35.8617, lng: 104.1954, region: '东亚' },
        description: '黄河长江流域诞生的古老文明，也是延续至今的重要文明传统。',
        features: ['甲骨文', '青铜器', '礼乐制度', '农耕文明'],
        influence: ['汉字文化圈', '儒家思想', '政治制度'],
        color: '#b24b5a',
        radius: 30,
      },
    ],
  },
  {
    id: 'classical',
    name: '古典文明时期',
    startYear: -2000,
    endYear: 500,
    description: '帝国治理、哲学思辨与跨区域交流共同推动古典时代的形成。',
    headline: '思想体系、帝国秩序与公共制度在这一时期被系统化。',
    context:
      '这一章可以把“思想”和“制度”放在一起看：城邦、公民、法治、宗教传播和帝国行政，都是文明扩大影响范围的关键机制。',
    keyThreads: ['城邦与共和国', '帝国治理', '哲学与宗教传播'],
    guideQuestions: [
      '比较希腊与罗马时，不要只看艺术风格，更要看政治组织与公共生活的差异。',
      '观察波斯、印度与中国如何在不同地理尺度上发展出自己的整合秩序。',
      '注意丝绸之路等早期交流网络，它们让思想、商品与技术跨区域流动。',
    ],
    resources: [
      {
        title: 'Heilbrunn Timeline of Art History',
        source: 'The Met',
        url: 'https://www.metmuseum.org/toah/',
        description: '可从年代、地域和主题入口追踪古典时代的艺术与制度变化。',
      },
      {
        title: 'Greece and Rome',
        source: 'British Museum',
        url: 'https://www.britishmuseum.org/our-work/departments/greece-and-rome',
        description: '英国博物馆关于古希腊、古罗马及地中海世界的核心入口。',
      },
      {
        title: 'Greek and Roman life',
        source: 'British Museum',
        url: 'https://www.britishmuseum.org/collection/galleries/greek-and-roman-life',
        description: '从日常生活的角度理解古典文明的制度、宗教与社会结构。',
      },
    ],
    cultures: [
      {
        id: 'greece',
        name: '古希腊文明',
        nameEn: 'Ancient Greece',
        period: '公元前800年-公元前146年',
        location: { lat: 39.0742, lng: 21.8243, region: '欧洲' },
        description: '西方文明的重要源头之一，民主政治、哲学与戏剧传统在此成熟。',
        features: ['民主政治', '哲学思想', '奥林匹克', '戏剧艺术'],
        influence: ['西方民主', '哲学传统', '艺术美学'],
        color: '#4b87b7',
        radius: 26,
      },
      {
        id: 'rome',
        name: '古罗马文明',
        nameEn: 'Ancient Rome',
        period: '公元前753年-公元476年',
        location: { lat: 41.9028, lng: 12.4964, region: '欧洲' },
        description: '伟大的帝国文明，以法律、工程与政治制度对后世影响深远。',
        features: ['罗马法', '共和制度', '工程技术', '军事组织'],
        influence: ['法律体系', '政治制度', '语言文化'],
        color: '#7d5ba6',
        radius: 28,
      },
      {
        id: 'persia',
        name: '波斯帝国',
        nameEn: 'Persian Empire',
        period: '公元前550年-公元651年',
        location: { lat: 32.4279, lng: 53.688, region: '西亚' },
        description: '横跨欧亚非的大帝国，以行省制度与多元包容著称。',
        features: ['行省制度', '驿道系统', '琐罗亚斯德教', '皇家建筑'],
        influence: ['帝国治理', '文化交流', '宗教思想'],
        color: '#3f8a79',
        radius: 25,
      },
      {
        id: 'india_classical',
        name: '印度古典文明',
        nameEn: 'Classical India',
        period: '公元前322年-公元550年',
        location: { lat: 20.5937, lng: 78.9629, region: '南亚' },
        description: '孔雀王朝与笈多王朝时期的辉煌文明，宗教与学术发展迅速。',
        features: ['佛教兴起', '阿拉伯数字', '医学体系', '文学艺术'],
        influence: ['佛教传播', '数学发展', '医学知识'],
        color: '#b36b28',
        radius: 24,
      },
      {
        id: 'china_classical',
        name: '中华古典文明',
        nameEn: 'Classical China',
        period: '公元前221年-公元589年',
        location: { lat: 34.3416, lng: 108.9398, region: '东亚' },
        description: '秦汉魏晋南北朝时期，统一帝国与经典政治文化的核心逐渐形成。',
        features: ['统一帝国', '儒家正统', '丝绸之路', '造纸术'],
        influence: ['东亚文化圈', '政治制度', '科技发明'],
        color: '#af4d41',
        radius: 28,
      },
    ],
  },
  {
    id: 'medieval',
    name: '中古文明交融',
    startYear: 500,
    endYear: 1500,
    description: '贸易网络、宗教世界与帝国扩张让欧亚大陆出现更密集的文明互动。',
    headline: '中世纪并不封闭，它是跨大陆网络不断加密的时代。',
    context:
      '这一阶段最重要的变化，是文明中心不再只靠单一帝国支撑，而是由丝路、海路、宗教共同体与知识翻译活动共同连接起来。',
    keyThreads: ['丝路与海路', '宗教共同体', '欧亚大陆连接'],
    guideQuestions: [
      '观察伊斯兰文明、拜占庭与唐宋中国如何在不同方向上成为知识与贸易枢纽。',
      '理解“中世纪”不是停滞，而是不断发生翻译、传播、吸收与重组。',
      '注意蒙古帝国如何通过军事征服反而加速了欧亚信息与技术流动。',
    ],
    resources: [
      {
        title: 'The UNESCO Silk Roads Programme',
        source: 'UNESCO',
        url: 'https://www.unesco.org/en/silkroads',
        description: '从全球交流史角度理解欧亚大陆的商贸、知识与文化流动。',
      },
      {
        title: 'Islamic Art',
        source: 'The Met',
        url: 'https://www.metmuseum.org/about-the-met/collection-areas/islamic-art',
        description: '以馆藏与策展资料理解伊斯兰世界的艺术与跨区域影响。',
      },
      {
        title: 'Heilbrunn Timeline of Art History',
        source: 'The Met',
        url: 'https://www.metmuseum.org/toah/',
        description: '适合继续追踪拜占庭、中世纪欧洲与亚洲文明的并行变化。',
      },
    ],
    cultures: [
      {
        id: 'islamic',
        name: '伊斯兰文明',
        nameEn: 'Islamic Civilization',
        period: '7世纪-15世纪',
        location: { lat: 24.7136, lng: 46.6753, region: '西亚' },
        description: '阿拉伯帝国开创的辉煌文明，是科学、翻译与跨文化传播的重要节点。',
        features: ['伊斯兰教', '科学发展', '翻译运动', '艺术创作'],
        influence: ['科学传播', '数学发展', '文化交流'],
        color: '#4b9b74',
        radius: 32,
      },
      {
        id: 'byzantine',
        name: '拜占庭帝国',
        nameEn: 'Byzantine Empire',
        period: '330年-1453年',
        location: { lat: 41.0082, lng: 28.9784, region: '欧洲' },
        description: '东罗马帝国的延续，也是古典传统与基督教世界的重要连接者。',
        features: ['东正教', '君士坦丁堡', '查士丁尼法典', '马赛克艺术'],
        influence: ['东正教传统', '法律体系', '艺术风格'],
        color: '#7a619f',
        radius: 24,
      },
      {
        id: 'europe_medieval',
        name: '欧洲中世纪',
        nameEn: 'Medieval Europe',
        period: '5世纪-15世纪',
        location: { lat: 48.8566, lng: 2.3522, region: '欧洲' },
        description: '封建制度与基督教秩序主导下的欧洲社会，也孕育了大学和城市复兴。',
        features: ['封建制度', '哥特式建筑', '大学兴起', '骑士文化'],
        influence: ['现代大学', '法律制度', '文化传统'],
        color: '#425060',
        radius: 26,
      },
      {
        id: 'china_medieval',
        name: '唐宋文明',
        nameEn: 'Tang-Song China',
        period: '618年-1279年',
        location: { lat: 34.7466, lng: 113.6253, region: '东亚' },
        description: '中华文明的黄金时期之一，经济、科技与文化创造力都达到高峰。',
        features: ['科举制度', '诗词艺术', '四大发明', '海上贸易'],
        influence: ['东亚文化', '科技传播', '经济模式'],
        color: '#b74e45',
        radius: 30,
      },
      {
        id: 'mongol',
        name: '蒙古帝国',
        nameEn: 'Mongol Empire',
        period: '1206年-1368年',
        location: { lat: 47.9185, lng: 106.9177, region: '中亚' },
        description: '历史上最大的陆地帝国之一，强化了欧亚大陆间的人员与信息流动。',
        features: ['骑兵战术', '驿站系统', '宗教宽容', '贸易保护'],
        influence: ['欧亚交流', '文化传播', '技术传播'],
        color: '#4b8b81',
        radius: 28,
      },
    ],
  },
  {
    id: 'exploration',
    name: '大航海时代',
    startYear: 1400,
    endYear: 1700,
    description: '航海、印刷与知识革命让世界被重新测量，也让全球联系大幅加深。',
    headline: '世界被重新连接，同时也被重新划分与竞争。',
    context:
      '这一时期既有文艺复兴的人文转向，也有宗教改革、新航路、殖民扩张与全球贸易网络的形成。它是“现代世界”诞生前的关键转折带。',
    keyThreads: ['海权与贸易', '印刷与宗教改革', '科学观察与测量'],
    guideQuestions: [
      '把文艺复兴、宗教改革与航海扩张放在一起看，才能理解欧洲为何迅速外溢。',
      '注意“发现”并不只是地理事件，更是地图、知识和权力重新分配的过程。',
      '观察明朝中国在海洋探索上的高点与后续收缩，这能帮助理解不同现代化路径。',
    ],
    resources: [
      {
        title: 'Free to Use and Reuse: Discovery and Exploration',
        source: 'Library of Congress',
        url: 'https://www.loc.gov/free-to-use/discovery-and-exploration/',
        description: '通过地图、版画与档案材料理解地理发现与世界图像的变化。',
      },
      {
        title: 'Science City 1550–1800: The Linbury Gallery',
        source: 'Science Museum',
        url: 'https://www.sciencemuseum.org.uk/see-and-do/science-city-1550-1800-linbury-gallery',
        description: '把贸易、实验、测量和城市发展放在同一框架下看待早期现代世界。',
      },
      {
        title: 'European Sculpture and Decorative Arts',
        source: 'The Met',
        url: 'https://www.metmuseum.org/about-the-met/collection-areas/european-sculpture-and-decorative-arts/',
        description: '从欧洲早期现代物质文化进入文艺复兴和全球贸易体系。',
      },
    ],
    cultures: [
      {
        id: 'renaissance',
        name: '文艺复兴',
        nameEn: 'Renaissance',
        period: '14世纪-17世纪',
        location: { lat: 43.7696, lng: 11.2558, region: '欧洲' },
        description: '欧洲文化和艺术的复兴，人文主义与古典精神被重新激活。',
        features: ['人文主义', '艺术创新', '科学探索', '古典复兴'],
        influence: ['现代艺术', '科学方法', '思想解放'],
        color: '#cf8f37',
        radius: 26,
      },
      {
        id: 'reformation',
        name: '宗教改革',
        nameEn: 'Reformation',
        period: '16世纪',
        location: { lat: 51.1657, lng: 10.4515, region: '欧洲' },
        description: '基督教世界的分裂重组，宗教与政治版图随之发生深刻变化。',
        features: ['新教兴起', '宗教战争', '印刷术', '思想自由'],
        influence: ['宗教多元化', '教育普及', '资本主义'],
        color: '#7a60a0',
        radius: 24,
      },
      {
        id: 'age_discovery',
        name: '地理大发现',
        nameEn: 'Age of Discovery',
        period: '15世纪-17世纪',
        location: { lat: 38.7223, lng: -9.1393, region: '欧洲' },
        description: '欧洲航海扩展世界联系，也重塑了全球贸易与殖民格局。',
        features: ['新航路开辟', '殖民扩张', '物种交换', '全球贸易'],
        influence: ['全球化开端', '殖民体系', '文化交流'],
        color: '#4b87b7',
        radius: 28,
      },
      {
        id: 'ming',
        name: '明朝中国',
        nameEn: 'Ming China',
        period: '1368年-1644年',
        location: { lat: 39.9042, lng: 116.4074, region: '东亚' },
        description: '郑和下西洋、城市文化繁荣与海禁并存，是一条不同于欧洲的海洋路径。',
        features: ['郑和下西洋', '紫禁城', '永乐大典', '海禁政策'],
        influence: ['东亚秩序', '海洋探索', '文化传播'],
        color: '#b84e44',
        radius: 28,
      },
    ],
  },
  {
    id: 'industrial',
    name: '工业革命',
    startYear: 1760,
    endYear: 1914,
    description: '机器、能源与工厂重塑了生产方式，也改变了城市、劳动与国家竞争。',
    headline: '从手工世界到机器世界，社会节奏被重新定义。',
    context:
      '工业革命不只是技术升级，它把劳动组织、城市生活、国家能力和全球市场一起改写。现代性的许多矛盾，也在这一阶段清晰显形。',
    keyThreads: ['蒸汽与工厂', '城市化与劳动', '全球工业扩散'],
    guideQuestions: [
      '先看英国，再看美国、日本与欧洲大陆，理解工业化如何向不同制度环境扩散。',
      '不要只看发明本身，更要看工厂制度、铁路与城市生活如何改变普通人的日常。',
      '注意这一时期的现代国家、现代战争和现代大众文化开始互相强化。',
    ],
    resources: [
      {
        title: 'Making the Modern World',
        source: 'Science Museum',
        url: 'https://www.sciencemuseum.org.uk/see-and-do/making-modern-world',
        description: '从 1750 年至今的重要技术与工业对象，理解工业化如何塑造现代世界。',
      },
      {
        title: 'Industrial Revolution',
        source: 'Encyclopaedia Britannica',
        url: 'https://www.britannica.com/event/Industrial-Revolution',
        description: '工业革命的历史、阶段划分及社会影响概览。',
      },
      {
        title: 'Information Age',
        source: 'Science Museum',
        url: 'https://www.sciencemuseum.org.uk/see-and-do/information-age',
        description: '把工业革命延伸到通信革命，帮助理解现代技术社会如何连续发展。',
      },
    ],
    cultures: [
      {
        id: 'britain_industrial',
        name: '英国工业革命',
        nameEn: 'British Industrial Revolution',
        period: '1760年-1840年',
        location: { lat: 52.3555, lng: -1.1743, region: '欧洲' },
        description: '工业革命的发源地，工厂制度和机械化生产在这里迅速成型。',
        features: ['蒸汽机', '工厂制度', '铁路时代', '纺织工业'],
        influence: ['工业模式', '城市化', '社会变革'],
        color: '#43515f',
        radius: 28,
      },
      {
        id: 'american',
        name: '美国文明',
        nameEn: 'American Civilization',
        period: '1776年-至今',
        location: { lat: 39.8283, lng: -98.5795, region: '北美' },
        description: '新兴国家在工业、制度与文化传播层面迅速扩大影响力。',
        features: ['民主共和', '联邦制度', '西进运动', '移民文化'],
        influence: ['民主制度', '经济模式', '文化输出'],
        color: '#4f8bb9',
        radius: 30,
      },
      {
        id: 'europe_modern',
        name: '现代欧洲',
        nameEn: 'Modern Europe',
        period: '19世纪',
        location: { lat: 50.8503, lng: 4.3517, region: '欧洲' },
        description: '民族国家兴起，启蒙遗产、科学发展与城市文化共同扩张。',
        features: ['民族国家', '科学革命', '启蒙思想', '艺术创新'],
        influence: ['现代政治', '科学方法', '文化潮流'],
        color: '#916db0',
        radius: 26,
      },
      {
        id: 'japan_meiji',
        name: '明治日本',
        nameEn: 'Meiji Japan',
        period: '1868年-1912年',
        location: { lat: 35.6762, lng: 139.6503, region: '东亚' },
        description: '通过制度改革和工业建设迅速完成现代国家转型。',
        features: ['明治维新', '富国强兵', '文明开化', '工业建设'],
        influence: ['亚洲现代化', '制度创新', '文化融合'],
        color: '#bb5f79',
        radius: 24,
      },
    ],
  },
  {
    id: 'contemporary',
    name: '当代全球化',
    startYear: 1945,
    endYear: 2024,
    description: '信息技术、全球治理与文化多样性交织，世界进入实时互联的新阶段。',
    headline: '全球化让文化传播更快，也让认同、治理与伦理问题更复杂。',
    context:
      '这一章最适合从“网络”而不是“国家”出发来理解：媒介网络、供应链网络、知识网络与平台网络共同改变了文化流动、创新速度与公共生活。',
    keyThreads: ['网络社会', '多元文化', '技术伦理与治理'],
    guideQuestions: [
      '从信息时代切入，理解技术平台如何改变文化生产、传播和参与方式。',
      '比较全球文化与本土文化的关系，注意它们并不是简单替代，而是持续重组。',
      '把现代中国、欧盟和全球治理放在一起看，理解多极化与协作并存的现实。',
    ],
    resources: [
      {
        title: 'Diversity of Cultural Expression',
        source: 'UNESCO',
        url: 'https://www.unesco.org/en/diversity-cultural-expression',
        description: '联合国教科文组织关于文化多样性与文化表达保护的核心入口。',
      },
      {
        title: 'Information Age',
        source: 'Science Museum',
        url: 'https://www.sciencemuseum.org.uk/see-and-do/information-age',
        description: '以通信与信息技术对象梳理现代信息社会的形成过程。',
      },
      {
        title: 'Ethics of Artificial Intelligence',
        source: 'UNESCO',
        url: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
        description: '理解人工智能时代文化、治理与伦理议题的重要官方入口。',
      },
    ],
    cultures: [
      {
        id: 'information_age',
        name: '信息时代',
        nameEn: 'Information Age',
        period: '20世纪末-至今',
        location: { lat: 37.7749, lng: -122.4194, region: '北美' },
        description: '互联网和数字技术革命彻底改变了信息传播与协作方式。',
        features: ['互联网', '人工智能', '移动通信', '社交媒体'],
        influence: ['全球连接', '知识共享', '经济变革'],
        color: '#339fb8',
        radius: 32,
      },
      {
        id: 'global_culture',
        name: '全球文化',
        nameEn: 'Global Culture',
        period: '21世纪',
        location: { lat: 40.7128, lng: -74.006, region: '全球' },
        description: '多元文化持续交融，全球流行文化与地方经验同时塑造认同。',
        features: ['文化交融', '价值多元', '创意产业', '可持续发展'],
        influence: ['文化认同', '全球治理', '人类命运共同体'],
        color: '#d58c2f',
        radius: 28,
      },
      {
        id: 'china_modern',
        name: '现代中国',
        nameEn: 'Modern China',
        period: '1949年-至今',
        location: { lat: 39.9042, lng: 116.4074, region: '东亚' },
        description: '在现代化、科技创新与文化传承之间形成独特的发展路径。',
        features: ['改革开放', '科技创新', '文化传承', '一带一路'],
        influence: ['发展模式', '文化复兴', '全球治理'],
        color: '#bb5144',
        radius: 30,
      },
      {
        id: 'eu',
        name: '欧盟',
        nameEn: 'European Union',
        period: '1993年-至今',
        location: { lat: 50.8503, lng: 4.3517, region: '欧洲' },
        description: '欧洲一体化是区域合作、规范治理与制度协调的重要实验。',
        features: ['区域一体化', '共同市场', '欧元货币', '民主价值'],
        influence: ['区域合作', '治理模式', '和平发展'],
        color: '#5f6db6',
        radius: 26,
      },
    ],
  },
];

export const getEraById = (id: string): Era | undefined => {
  return eras.find((era) => era.id === id);
};

export const getCultureById = (id: string): Culture | undefined => {
  for (const era of eras) {
    const culture = era.cultures.find((candidate) => candidate.id === id);
    if (culture) return culture;
  }
  return undefined;
};

export const getSpotlightCulture = (era: Era): Culture => {
  return era.cultures.reduce((current, candidate) => {
    return candidate.radius > current.radius ? candidate : current;
  }, era.cultures[0]);
};
