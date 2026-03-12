// 人类文化演化数据
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
  cultures: Culture[];
}

export const eras: Era[] = [
  {
    id: "ancient",
    name: "远古文明起源",
    startYear: -3500,
    endYear: -2000,
    description: "人类最早的文明在河流流域诞生，形成了四大文明古国",
    cultures: [
      {
        id: "mesopotamia",
        name: "两河流域文明",
        nameEn: "Mesopotamia",
        period: "公元前3500年-公元前2000年",
        location: { lat: 33.2232, lng: 43.6793, region: "西亚" },
        description: "人类最早的文明之一，发明了楔形文字和轮子，建立了城邦国家",
        features: ["楔形文字", "汉谟拉比法典", "轮子发明", "城市国家"],
        influence: ["法律体系", "文字记录", "数学六十进制"],
        color: "#e74c3c",
        radius: 25
      },
      {
        id: "egypt",
        name: "古埃及文明",
        nameEn: "Ancient Egypt",
        period: "公元前3100年-公元前30年",
        location: { lat: 26.8206, lng: 30.8025, region: "北非" },
        description: "尼罗河流域的伟大文明，以金字塔和象形文字闻名于世",
        features: ["金字塔", "象形文字", "木乃伊", "太阳历"],
        influence: ["建筑技术", "医学知识", "数学几何"],
        color: "#f39c12",
        radius: 28
      },
      {
        id: "indus",
        name: "古印度文明",
        nameEn: "Indus Valley",
        period: "公元前3300年-公元前1300年",
        location: { lat: 28.6139, lng: 77.2090, region: "南亚" },
        description: "印度河流域的古老文明，拥有规划良好的城市",
        features: ["城市规划", "排水系统", "印章文字", "度量衡"],
        influence: ["城市规划理念", "数学概念", "后来的印度教"],
        color: "#9b59b6",
        radius: 22
      },
      {
        id: "china_ancient",
        name: "中华文明",
        nameEn: "Chinese Civilization",
        period: "公元前2070年-至今",
        location: { lat: 35.8617, lng: 104.1954, region: "东亚" },
        description: "黄河长江流域诞生的古老文明，延续至今的唯一古文明",
        features: ["甲骨文", "青铜器", "礼乐制度", "农耕文明"],
        influence: ["汉字文化圈", "儒家思想", "政治制度"],
        color: "#e91e63",
        radius: 30
      }
    ]
  },
  {
    id: "classical",
    name: "古典文明时期",
    startYear: -2000,
    endYear: 500,
    description: "各大文明进入黄金时代，哲学、艺术、科学蓬勃发展",
    cultures: [
      {
        id: "greece",
        name: "古希腊文明",
        nameEn: "Ancient Greece",
        period: "公元前800年-公元前146年",
        location: { lat: 39.0742, lng: 21.8243, region: "欧洲" },
        description: "西方文明的摇篮，民主政治和哲学思想的发源地",
        features: ["民主政治", "哲学思想", "奥林匹克", "戏剧艺术"],
        influence: ["西方民主", "哲学传统", "艺术美学"],
        color: "#3498db",
        radius: 26
      },
      {
        id: "rome",
        name: "古罗马文明",
        nameEn: "Ancient Rome",
        period: "公元前753年-公元476年",
        location: { lat: 41.9028, lng: 12.4964, region: "欧洲" },
        description: "伟大的帝国文明，法律和政治制度的典范",
        features: ["罗马法", "共和制度", "工程技术", "军事组织"],
        influence: ["法律体系", "政治制度", "语言文化"],
        color: "#8e44ad",
        radius: 28
      },
      {
        id: "persia",
        name: "波斯帝国",
        nameEn: "Persian Empire",
        period: "公元前550年-公元651年",
        location: { lat: 32.4279, lng: 53.6880, region: "西亚" },
        description: "横跨欧亚非的大帝国，包容多元的帝国文化",
        features: ["行省制度", "驿道系统", "琐罗亚斯德教", "皇家建筑"],
        influence: ["帝国治理", "文化交流", "宗教思想"],
        color: "#16a085",
        radius: 25
      },
      {
        id: "india_classical",
        name: "印度古典文明",
        nameEn: "Classical India",
        period: "公元前322年-公元550年",
        location: { lat: 20.5937, lng: 78.9629, region: "南亚" },
        description: "孔雀王朝和笈多王朝时期的辉煌文明",
        features: ["佛教兴起", "阿拉伯数字", "医学体系", "文学艺术"],
        influence: ["佛教传播", "数学发展", "医学知识"],
        color: "#d35400",
        radius: 24
      },
      {
        id: "china_classical",
        name: "中华古典文明",
        nameEn: "Classical China",
        period: "公元前221年-公元589年",
        location: { lat: 34.3416, lng: 108.9398, region: "东亚" },
        description: "秦汉魏晋南北朝时期，中华文明的核心形成期",
        features: ["统一帝国", "儒家正统", "丝绸之路", "造纸术"],
        influence: ["东亚文化圈", "政治制度", "科技发明"],
        color: "#c0392b",
        radius: 28
      }
    ]
  },
  {
    id: "medieval",
    name: "中古文明交融",
    startYear: 500,
    endYear: 1500,
    description: "各大文明相互交融，伊斯兰文明兴起，欧洲中世纪",
    cultures: [
      {
        id: "islamic",
        name: "伊斯兰文明",
        nameEn: "Islamic Civilization",
        period: "7世纪-15世纪",
        location: { lat: 24.7136, lng: 46.6753, region: "西亚" },
        description: "阿拉伯帝国开创的辉煌文明，科学和文化的守护者",
        features: ["伊斯兰教", "科学发展", "翻译运动", "艺术创作"],
        influence: ["科学传播", "数学发展", "文化交流"],
        color: "#27ae60",
        radius: 32
      },
      {
        id: "byzantine",
        name: "拜占庭帝国",
        nameEn: "Byzantine Empire",
        period: "330年-1453年",
        location: { lat: 41.0082, lng: 28.9784, region: "欧洲" },
        description: "东罗马帝国的延续，基督教文明的守护者",
        features: ["东正教", "君士坦丁堡", "查士丁尼法典", "马赛克艺术"],
        influence: ["东正教传统", "法律体系", "艺术风格"],
        color: "#8e44ad",
        radius: 24
      },
      {
        id: "europe_medieval",
        name: "欧洲中世纪",
        nameEn: "Medieval Europe",
        period: "5世纪-15世纪",
        location: { lat: 48.8566, lng: 2.3522, region: "欧洲" },
        description: "封建制度和基督教主导的欧洲文明",
        features: ["封建制度", "哥特式建筑", "大学兴起", "骑士文化"],
        influence: ["现代大学", "法律制度", "文化传统"],
        color: "#2c3e50",
        radius: 26
      },
      {
        id: "china_medieval",
        name: "唐宋文明",
        nameEn: "Tang-Song China",
        period: "618年-1279年",
        location: { lat: 34.7466, lng: 113.6253, region: "东亚" },
        description: "中华文明的黄金时代，经济文化高度繁荣",
        features: ["科举制度", "诗词艺术", "四大发明", "海上贸易"],
        influence: ["东亚文化", "科技传播", "经济模式"],
        color: "#e74c3c",
        radius: 30
      },
      {
        id: "mongol",
        name: "蒙古帝国",
        nameEn: "Mongol Empire",
        period: "1206年-1368年",
        location: { lat: 47.9185, lng: 106.9177, region: "中亚" },
        description: "历史上最大的陆地帝国，促进欧亚大陆交流",
        features: ["骑兵战术", "驿站系统", "宗教宽容", "贸易保护"],
        influence: ["欧亚交流", "文化传播", "技术传播"],
        color: "#16a085",
        radius: 28
      }
    ]
  },
  {
    id: "exploration",
    name: "大航海时代",
    startYear: 1400,
    endYear: 1700,
    description: "地理大发现开启全球化进程，世界开始连为一体",
    cultures: [
      {
        id: "renaissance",
        name: "文艺复兴",
        nameEn: "Renaissance",
        period: "14世纪-17世纪",
        location: { lat: 43.7696, lng: 11.2558, region: "欧洲" },
        description: "欧洲文化和艺术的复兴，人文主义兴起",
        features: ["人文主义", "艺术创新", "科学探索", "古典复兴"],
        influence: ["现代艺术", "科学方法", "思想解放"],
        color: "#f39c12",
        radius: 26
      },
      {
        id: "reformation",
        name: "宗教改革",
        nameEn: "Reformation",
        period: "16世纪",
        location: { lat: 51.1657, lng: 10.4515, region: "欧洲" },
        description: "基督教世界的分裂，新教兴起",
        features: ["新教兴起", "宗教战争", "印刷术", "思想自由"],
        influence: ["宗教多元化", "教育普及", "资本主义"],
        color: "#8e44ad",
        radius: 24
      },
      {
        id: "age_discovery",
        name: "地理大发现",
        nameEn: "Age of Discovery",
        period: "15世纪-17世纪",
        location: { lat: 38.7223, lng: -9.1393, region: "欧洲" },
        description: "欧洲人探索世界，建立全球贸易网络",
        features: ["新航路开辟", "殖民扩张", "物种交换", "全球贸易"],
        influence: ["全球化开端", "殖民体系", "文化交流"],
        color: "#3498db",
        radius: 28
      },
      {
        id: "ming",
        name: "明朝中国",
        nameEn: "Ming China",
        period: "1368年-1644年",
        location: { lat: 39.9042, lng: 116.4074, region: "东亚" },
        description: "郑和下西洋，海上丝绸之路的巅峰",
        features: ["郑和下西洋", "紫禁城", "永乐大典", "海禁政策"],
        influence: ["东亚秩序", "海洋探索", "文化传播"],
        color: "#e74c3c",
        radius: 28
      }
    ]
  },
  {
    id: "industrial",
    name: "工业革命",
    startYear: 1760,
    endYear: 1914,
    description: "工业革命改变世界，现代文明崛起",
    cultures: [
      {
        id: "britain_industrial",
        name: "英国工业革命",
        nameEn: "British Industrial Revolution",
        period: "1760年-1840年",
        location: { lat: 52.3555, lng: -1.1743, region: "欧洲" },
        description: "工业革命的发源地，现代工业文明的起点",
        features: ["蒸汽机", "工厂制度", "铁路时代", "纺织工业"],
        influence: ["工业模式", "城市化", "社会变革"],
        color: "#2c3e50",
        radius: 28
      },
      {
        id: "american",
        name: "美国文明",
        nameEn: "American Civilization",
        period: "1776年-至今",
        location: { lat: 39.8283, lng: -98.5795, region: "北美" },
        description: "新兴民主国家，现代政治制度的实验场",
        features: ["民主共和", "联邦制度", "西进运动", "移民文化"],
        influence: ["民主制度", "经济模式", "文化输出"],
        color: "#3498db",
        radius: 30
      },
      {
        id: "europe_modern",
        name: "现代欧洲",
        nameEn: "Modern Europe",
        period: "19世纪",
        location: { lat: 50.8503, lng: 4.3517, region: "欧洲" },
        description: "民族国家兴起，科学文化繁荣",
        features: ["民族国家", "科学革命", "启蒙思想", "艺术创新"],
        influence: ["现代政治", "科学方法", "文化潮流"],
        color: "#9b59b6",
        radius: 26
      },
      {
        id: "japan_meiji",
        name: "明治日本",
        nameEn: "Meiji Japan",
        period: "1868年-1912年",
        location: { lat: 35.6762, lng: 139.6503, region: "东亚" },
        description: "日本现代化改革，亚洲第一个工业化国家",
        features: ["明治维新", "富国强兵", "文明开化", "工业建设"],
        influence: ["亚洲现代化", "制度创新", "文化融合"],
        color: "#e91e63",
        radius: 24
      }
    ]
  },
  {
    id: "contemporary",
    name: "当代全球化",
    startYear: 1945,
    endYear: 2024,
    description: "信息时代和全球化，多元文化交融",
    cultures: [
      {
        id: "information_age",
        name: "信息时代",
        nameEn: "Information Age",
        period: "20世纪末-至今",
        location: { lat: 37.7749, lng: -122.4194, region: "北美" },
        description: "互联网和数字技术革命，信息传播方式彻底改变",
        features: ["互联网", "人工智能", "移动通信", "社交媒体"],
        influence: ["全球连接", "知识共享", "经济变革"],
        color: "#00bcd4",
        radius: 32
      },
      {
        id: "global_culture",
        name: "全球文化",
        nameEn: "Global Culture",
        period: "21世纪",
        location: { lat: 40.7128, lng: -74.0060, region: "全球" },
        description: "多元文化交融，全球化与本土化的张力",
        features: ["文化交融", "价值多元", "创意产业", "可持续发展"],
        influence: ["文化认同", "全球治理", "人类命运共同体"],
        color: "#ff9800",
        radius: 28
      },
      {
        id: "china_modern",
        name: "现代中国",
        nameEn: "Modern China",
        period: "1949年-至今",
        location: { lat: 39.9042, lng: 116.4074, region: "东亚" },
        description: "中华文明伟大复兴，现代化建设成就显著",
        features: ["改革开放", "科技创新", "文化传承", "一带一路"],
        influence: ["发展模式", "文化复兴", "全球治理"],
        color: "#e74c3c",
        radius: 30
      },
      {
        id: "eu",
        name: "欧盟",
        nameEn: "European Union",
        period: "1993年-至今",
        location: { lat: 50.8503, lng: 4.3517, region: "欧洲" },
        description: "欧洲一体化的最高形式，区域合作的典范",
        features: ["区域一体化", "共同市场", "欧元货币", "民主价值"],
        influence: ["区域合作", "治理模式", "和平发展"],
        color: "#3f51b5",
        radius: 26
      }
    ]
  }
];

export const getEraById = (id: string): Era | undefined => {
  return eras.find(era => era.id === id);
};

export const getCultureById = (id: string): Culture | undefined => {
  for (const era of eras) {
    const culture = era.cultures.find(c => c.id === id);
    if (culture) return culture;
  }
  return undefined;
};
