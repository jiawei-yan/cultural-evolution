import type { Locale } from '@/data/cultures';

export const siteContent = {
  zh: {
    header: {
      title: '人类文化演化图谱',
      subtitle: '先选历史篇章，再看地图，最后展开细节。',
      currentChapter: '当前篇章',
      helpButton: '使用说明',
      preferences: '显示偏好',
      themeLabel: '主题',
      lightTheme: '亮色',
      darkTheme: '暗色',
      languageLabel: '语言',
      chinese: '中文',
      english: 'English',
      dialogTitle: '怎么阅读这个页面',
      dialogDescription: '页面被压缩成四个层级：篇章、地图、焦点、深挖。',
      steps: [
        {
          title: '先点击顶部六个历史篇章中的任意一个。',
          description:
            '顶部导航是主入口，地图、说明和阅读链接都会随之切换。',
        },
        {
          title: '再点击地图圆点或下方文化节点卡片切换焦点。',
          description:
            '右侧摘要会即时更新，方便你快速抓住当前最重要的文明节点。',
        },
        {
          title: '想继续深挖时，再打开详细资料与延伸阅读。',
          description:
            '详细资料以抽屉形式展开，底部外链则指向博物馆、图书馆和国际机构。',
        },
      ],
      linksTitle: '链接说明',
      linksDescription:
        '页面中的外部链接会在新标签页打开，方便把主界面保留在当前篇章。',
    },
    timeline: {
      eyebrow: '历史篇章',
      title: '六个历史篇章',
      description:
        '这里是页面主入口。先选时代，再看地图、焦点文明和详细资料。',
      play: '自动浏览',
      pause: '暂停浏览',
      previous: '上一章',
      next: '下一章',
    },
    app: {
      currentChapterEyebrow: '当前篇章',
      howToReadEyebrow: '阅读方式',
      howToReadTitle: '先选上方历史篇章，再看地图与焦点文明。',
      coverageRegions: '覆盖区域',
      cultureNodes: '文化节点',
      spotlight: '代表焦点',
      spotlightNote: '本章影响力最强的文明节点',
      nodesNote: '点击卡片或地图切换焦点',
      currentFocus: '当前焦点',
      openDetails: '展开详细资料',
      autoBrowse: '自动浏览六个篇章',
      pauseBrowse: '暂停自动浏览',
      worldMapEyebrow: '世界地图',
      worldMapTitle: '文化中心分布',
      worldMapDescription:
        '地图只突出当前焦点文明，其他节点保持简洁显示。先点圆点切换焦点，再通过右侧面板展开细节。',
      mapLegend: '圆点越大，表示该文化在本篇章中的影响范围越广。',
      currentWindow: '当前时间窗口',
      focusedCulture: '当前焦点文明',
      focusEyebrow: '焦点文明',
      timeLabel: '时间',
      regionLabel: '区域',
      influenceLabel: '影响力强度',
      coreFeatures: '核心特征',
      fullDetails: '查看完整细节',
      backToSpotlight: '回到代表文明',
      readingEyebrow: '阅读提示',
      readingTitle: '这一章先看什么',
      logicEyebrow: '内部逻辑',
      logicTitle: '本章内部的文明线索',
      transitionEyebrow: '篇章衔接',
      transitionTitle: '与前后篇章的关系',
      previousChapter: '上一章',
      nextChapter: '下一章',
      firstChapterTitle: '这是起点篇章',
      firstChapterDescription:
        '可以从这里开始，先建立对文明起源、国家形成和早期制度的整体理解。',
      latestChapterTitle: '这是最新篇章',
      latestChapterDescription:
        '此处已经来到时间线末端，可以回看前几章比较文明中心如何迁移与重组。',
      resourcesEyebrow: '延伸阅读',
      resourcesTitle: '权威延伸阅读',
      resourcesDescription:
        '这些链接来自博物馆、国际组织、图书馆与百科机构，适合沿着当前篇章继续深入阅读。',
      totalNodes: '个节点',
    },
    cultureList: {
      eyebrow: '文化节点',
      description:
        '这里保留本篇章最重要的节点卡片。点击卡片切换焦点，确认当前重点后再展开详细资料。',
      openFocused: '查看当前焦点详情',
      titleSuffix: '的文化节点',
      totalPrefix: '共',
      totalUnit: '个节点',
    },
    cultureCard: {
      active: '当前焦点',
      inactive: '点击聚焦',
    },
    panel: {
      eyebrow: '详细面板',
      regionLabel: '地理区域',
      influenceLabel: '影响力强度',
      overviewTitle: '文明概述',
      featuresTitle: '主要特征',
      impactTitle: '深层影响',
      coordinatesTitle: '空间坐标',
      latitudeLabel: '纬度',
      longitudeLabel: '经度',
      mapInfluenceLabel: '地图影响力强度',
      resourcesTitle: '延伸阅读',
      resourcesDescription:
        '如果你想继续深入这一篇章，下面这些权威页面可以作为下一步阅读入口。',
    },
  },
  en: {
    header: {
      title: 'Atlas of Cultural Evolution',
      subtitle: 'Pick a chapter first, then scan the map, then open the details.',
      currentChapter: 'Current Chapter',
      helpButton: 'How It Works',
      preferences: 'Display',
      themeLabel: 'Theme',
      lightTheme: 'Light',
      darkTheme: 'Dark',
      languageLabel: 'Language',
      chinese: '中文',
      english: 'English',
      dialogTitle: 'How to read this page',
      dialogDescription:
        'The interface is compressed into four layers: chapter, map, focus, and deeper reading.',
      steps: [
        {
          title: 'Start with any of the six historical chapters at the top.',
          description:
            'That rail is the primary entry point. The map, notes, and references all update with it.',
        },
        {
          title: 'Then click a map node or a culture card to change the focus.',
          description:
            'The summary panel updates immediately so the most important node stays clear.',
        },
        {
          title: 'Open the detail panel and reference links only when you want depth.',
          description:
            'Detailed notes slide in as a drawer, while external links point to museums, libraries, and international institutions.',
        },
      ],
      linksTitle: 'Link behavior',
      linksDescription:
        'External references open in a new tab so the current chapter stays visible in the main interface.',
    },
    timeline: {
      eyebrow: 'Historical Chapters',
      title: 'Six Historical Chapters',
      description:
        'This is the main entry point. Choose a period here, then move down into the map, focus node, and details.',
      play: 'Auto tour',
      pause: 'Pause tour',
      previous: 'Previous',
      next: 'Next',
    },
    app: {
      currentChapterEyebrow: 'Current Chapter',
      howToReadEyebrow: 'Reading Flow',
      howToReadTitle: 'Choose a chapter first, then read the map and the focus culture.',
      coverageRegions: 'Coverage',
      cultureNodes: 'Nodes',
      spotlight: 'Spotlight',
      spotlightNote: 'The most influential culture node in this chapter',
      nodesNote: 'Use cards or map nodes to change focus',
      currentFocus: 'Current Focus',
      openDetails: 'Open detail panel',
      autoBrowse: 'Auto-tour all six chapters',
      pauseBrowse: 'Pause auto-tour',
      worldMapEyebrow: 'World Map',
      worldMapTitle: 'Distribution of cultural centers',
      worldMapDescription:
        'The map emphasizes only the active focus culture while keeping the other nodes quiet. Click a node first, then expand the side panel for depth.',
      mapLegend:
        'Larger circles indicate a wider sphere of influence within the selected chapter.',
      currentWindow: 'Current Window',
      focusedCulture: 'Focused Culture',
      focusEyebrow: 'Focus Culture',
      timeLabel: 'Time',
      regionLabel: 'Region',
      influenceLabel: 'Influence',
      coreFeatures: 'Core Features',
      fullDetails: 'View full details',
      backToSpotlight: 'Back to spotlight',
      readingEyebrow: 'Reading Notes',
      readingTitle: 'What to notice first',
      logicEyebrow: 'Inner Logic',
      logicTitle: 'The internal lines of this chapter',
      transitionEyebrow: 'Transition',
      transitionTitle: 'How this chapter links to the next one',
      previousChapter: 'Previous',
      nextChapter: 'Next',
      firstChapterTitle: 'This is the opening chapter',
      firstChapterDescription:
        'Begin here to build a global view of civilizational origins, state formation, and early institutional tools.',
      latestChapterTitle: 'This is the latest chapter',
      latestChapterDescription:
        'You are at the end of the timeline. Look back across earlier chapters to compare how centers of influence shifted and recombined.',
      resourcesEyebrow: 'Further Reading',
      resourcesTitle: 'Authoritative references',
      resourcesDescription:
        'These links come from museums, international organizations, libraries, and encyclopedic institutions for deeper reading.',
      totalNodes: 'nodes',
    },
    cultureList: {
      eyebrow: 'Culture Nodes',
      description:
        'This grid keeps only the key nodes for the current chapter. Change focus here first, then open the detailed drawer when you want depth.',
      openFocused: 'Open focused node',
      titleSuffix: ' culture nodes',
      totalPrefix: '',
      totalUnit: 'nodes',
    },
    cultureCard: {
      active: 'Focused',
      inactive: 'Set focus',
    },
    panel: {
      eyebrow: 'Detail Panel',
      regionLabel: 'Region',
      influenceLabel: 'Influence',
      overviewTitle: 'Overview',
      featuresTitle: 'Major features',
      impactTitle: 'Deep impact',
      coordinatesTitle: 'Coordinates',
      latitudeLabel: 'Latitude',
      longitudeLabel: 'Longitude',
      mapInfluenceLabel: 'Mapped influence',
      resourcesTitle: 'Further reading',
      resourcesDescription:
        'If you want to go deeper into this chapter, these pages are good next steps from primary institutions.',
    },
  },
} as const;

export type SiteCopy = (typeof siteContent)[Locale];
