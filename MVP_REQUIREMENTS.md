# MVP 需求文档：Strong Inclination Crossword Clue

## 1. 项目概述

| 项目名 | Strong Inclination Crossword Clue |
|--------|----------------------------------|
| 项目类型 | 填字游戏线索查询工具 |
| 核心功能 | 输入单词，查找对应的填字游戏线索 |
| 目标用户 | 填字游戏爱好者、出题人 |
| 阶段 | MVP（最小可行产品） |
| 预计上线 | TBD |

---

## 2. 功能需求

### 2.1 核心功能（Must Have）

- **单词查询：** 用户输入单词，返回所有可用线索（P0）
- **模糊搜索：** 精确词未命中时，通过同义词/定义模糊匹配（P0）
- **线索复制：** 一键复制线索到剪贴板（P1）
- **同义词展示：** 显示查询词的同义词列表（P1）

### 2.2 扩展功能（Should Have）

- **词性标注：** 显示名词/动词/形容词等（P2）
- **外部 API Fallback：** 本地词库未命中时调用 Datamuse API（P2）
- **词库扩展：** 扩展到 5000~10000 高频填字词（P2）

### 2.3 未来功能（Nice to Have）

- 线索风格分类（直接型、解释型、双关型）
- 用户收藏/历史记录
- 每日推荐线索
- API 开放接口

---

## 3. 数据需求

### 3.1 本地词库

**来源：** 精选填字游戏高频词汇（基于 WordNet + 人工筛选）

**初始规模：** 5,000 词条（上线前扩展至 10,000+）

**覆盖率目标：** 常见填字游戏高频词 80%+

**字段结构：**

```
word: string          // 单词（英文大写）
pos: string           // 词性：n/v/adj/adv
synonyms: string[]   // 同义词列表
definition: string   // 英文定义
clues: string[]      // 可用线索（5条左右）
```

### 3.2 外部 API（Fallback）

**API：** Datamuse API（免费，无需 key）

**用途：** 本地词库未命中时补充查询

**调用方式：** `GET https://api.datamuse.com/words?rel_syn={query}`

---

## 4. 技术方案

### 4.1 技术栈

**前端框架：** Next.js 14 (App Router) — 支持静态导出

**UI 样式：** Tailwind CSS — 原子化 CSS

**词典数据：** 本地 JSON/TS — 打包进 bundle

**部署平台：** Cloudflare Pages — 免费 CDN

### 4.2 架构特点

- **纯前端：** 无后端服务，零服务器成本
- **静态导出：** Next.js `output: 'export'` 生成纯静态文件
- **本地查找：** 词典数据打包进 JS，首次加载后全本地运算

### 4.3 部署配置

- Framework preset: Next.js
- Build command: npm run build
- Output directory: out

---

## 5. 非功能需求

- **性能：** 首屏加载 < 3s（3G 网络）；词库 10k 条时 bundle < 5MB
- **响应速度：** 查询延迟 < 200ms（本地）
- **兼容性：** 现代浏览器（Chrome/Firefox/Safari/Edge 最新版）
- **可访问性：** 基础键盘导航，表单标签支持

---

## 6. UI/UX 方向

### 6.1 页面结构

- **单页应用：** 仅一个主页面
- **极简风格：** 搜索框 + 结果展示
- **暗色主题：** 深色背景，减少视觉疲劳

### 6.2 交互流程

用户输入单词 → 点击「查找」或按 Enter → 显示精确结果 OR 模糊匹配列表 OR 未找到提示 → 点击复制图标 → 复制线索到剪贴板

---

## 7. 项目目录结构

```
strong-inclination-crossword-clue/
├── app/
│   ├── page.tsx       # 主页面组件
│   ├── layout.tsx     # 根布局
│   └── globals.css    # 全局样式
├── lib/
│   └── dictionary.ts  # 词典数据 + 查找函数
├── public/            # 静态资源（如需）
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 8. 词库建设计划

### Phase 1（当前）

- 初始词库：100+ 精选高频词
- 验证功能可行性

### Phase 2（MVP 上线前）

- 词库扩展至 5,000 词
- 数据来源：WordNet 高频词 + 填字游戏常见词表

### Phase 3（持续迭代）

- 词库扩展至 10,000+ 词
- 人工审核线索质量
- 补充 rare/archaic words（填字游戏常用）

---

## 9. TODO（上线前）

- [ ] 词库扩展至 5,000 词
- [ ] 上线前词库达到 10,000+ 词
- [ ] Datamuse API Fallback 集成
- [ ] 移动端适配
- [ ] Cloudflare Pages 部署配置
- [ ] 基础 SEO（meta 标签、sitemap）
